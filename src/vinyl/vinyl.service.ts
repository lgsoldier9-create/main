import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vinyl } from 'src/entities/vinyl.entity';
import { Repository } from 'typeorm';
import { CreateVinylDto } from './dto/createVinylDto';
import { UpdateVinylDto } from './dto/updateVinylDto';
import { SortField, SortOrder } from './sort.enum';
import { VinylResponseDto } from './dto/vinylResponse.Dto';
@Injectable()
export class VinylService {
  constructor(
    @InjectRepository(Vinyl)
    private vinylsRepository: Repository<Vinyl>,
  ) {}

  async create(createVinylDto: CreateVinylDto): Promise<CreateVinylDto> {
    return await this.vinylsRepository.save(createVinylDto);
  }
  async update(id: number, updateVinylDto: UpdateVinylDto) {
    return await this.vinylsRepository.update(id, updateVinylDto);
  }
  async delete(id: number) {
    return await this.vinylsRepository.delete(id);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const vinylIdsQuery = this.vinylsRepository
      .createQueryBuilder('vinyl')
      .select('vinyl.id')
      .orderBy('vinyl.id', 'DESC')
      .skip(skip)
      .take(limit);

    const vinylIdsResult = await vinylIdsQuery.getMany();
    const vinylIds = vinylIdsResult.map((vinyl) => vinyl.id);

    if (vinylIds.length === 0) {
      return {
        vinyls: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
      };
    }

    const query = this.vinylsRepository
      .createQueryBuilder('vinyl')
      .leftJoinAndSelect('vinyl.reviews', 'review')
      .loadRelationCountAndMap('vinyl.reviewsCount', 'vinyl.reviews')
      .addSelect('AVG(review.rating)', 'averageRating')
      .addSelect(
        `(SELECT reviews.content FROM reviews
      WHERE reviews."vinylId" = vinyl.id 
      ORDER BY reviews.id ASC 
      LIMIT 1)`,
        'firstReview',
      )
      .where('vinyl.id IN (:...vinylIds)', { vinylIds })
      .groupBy('vinyl.id')
      .addGroupBy('review.id')
      .orderBy('vinyl.id', 'DESC');

    const rawResults = await query.getRawMany();

    const vinylsWithStats = rawResults.map((rawData) => {
      return new VinylResponseDto({
        id: rawData.vinyl_id,
        name: rawData.vinyl_name,
        authorName: rawData.vinyl_authorname,
        description: rawData.vinyl_description,
        price: rawData.vinyl_price,
        averageRating: rawData.averageRating,
        reviewsCount: rawData.reviewsCount,
        firstReview: rawData.firstReview,
      });
    });

    const total = await this.vinylsRepository.count();

    return {
      vinyls: vinylsWithStats,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async searchVinyls(
    searchTerm: string,
    sortBy: SortField = SortField.NAME,
    sortOrder: SortOrder = SortOrder.ASC,
  ) {
    const queryBuilder = this.vinylsRepository
      .createQueryBuilder('vinyl')
      .where('vinyl.name LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orWhere('vinyl.authorName LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .orWhere('vinyl.description LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });

    if (sortBy && sortOrder) {
      queryBuilder.orderBy(`vinyl.${sortBy}`, sortOrder);
    }

    const vinyls = await queryBuilder.getMany();

    return {
      vinyls,
      total: vinyls.length,
      sortBy,
      sortOrder,
    };
  }
}
