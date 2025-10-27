import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortField, SortOrder } from '../sort.enum';

export class SearchVinylsDto {
  @ApiProperty({
    description: 'Search query for vinyls',
    example: 'The Beatles',
    required: false,
  })
  @IsString()
  q: string;

  @ApiProperty({
    description: 'Sort by field',
    example: 'name',
    enum: SortField,
    required: false,
  })
  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.NAME;

  @ApiProperty({
    description: 'Sort order',
    example: 'ASC',
    enum: SortOrder,
    required: false,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.ASC;
}

