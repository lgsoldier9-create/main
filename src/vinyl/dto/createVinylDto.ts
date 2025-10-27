import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateVinylDto {
  @ApiProperty({
    description: 'Name of the vinyl',
    example: 'Vinyl Name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Author name of the vinyl',
    example: 'Author Name',
  })
  @IsString()
  authorName: string;

  @ApiProperty({
    description: 'Description of the vinyl',
    example: 'Description of the vinyl',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Price of the vinyl',
    example: 10.99,
  })
  @IsNumber()
  price: number;
}
