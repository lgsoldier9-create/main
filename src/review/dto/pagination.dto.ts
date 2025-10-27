import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  page: number;

  @ApiProperty({
    description: 'Limit of items per page for pagination',
    example: 10,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;
}
