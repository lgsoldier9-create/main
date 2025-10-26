import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortField, SortOrder } from '../sort.enum';

export class SearchVinylsDto {
  @IsString()
  q: string;

  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.NAME;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.ASC;
}
