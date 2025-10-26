import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VinylService } from './vinyl.service';
import { AuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { CreateVinylDto } from './dto/createVinylDto';
import { UpdateVinylDto } from './dto/updateVinylDto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';
import { SearchVinylsDto } from './dto/searchDto';
import { Vinyl } from 'src/entities/vinyl.entity';
@Controller('vinyl')
export class VinylController {
  constructor(private readonly vinylService: VinylService) {}
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createVinylDto: CreateVinylDto) {
    return await this.vinylService.create(createVinylDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: number,
    @Body() updateVinylDto: UpdateVinylDto,
  ) {
    return await this.vinylService.update(id, updateVinylDto);
  }
  @Delete('id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: number) {
    return await this.vinylService.delete(id);
  }
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const result = await this.vinylService.findAll(page, limit);

    return {
      success: true,
      data: result.vinyls,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
        hasNext: result.page < result.totalPages,
        hasPrev: result.page > 1,
      },
    };
  }
  @Get('search')
  @UseGuards(AuthGuard)
  async searchVinyls(@Query() searchDto: SearchVinylsDto) {
    if (!searchDto.q) {
      throw new BadRequestException('Search term is required');
    }

    const result = (await this.vinylService.searchVinyls(
      searchDto.q,
      searchDto.sortBy,
      searchDto.sortOrder,
    )) as {
      vinyls: Vinyl[];
      total: number;
      sortBy: string;
      sortOrder: string;
    };
    return {
      success: true,
      data: result.vinyls,
      meta: {
        searchTerm: searchDto.q,
        total: result.total,
        sortBy: result.sortBy,
        sortOrder: result.sortOrder,
      },
    };
  }
}
