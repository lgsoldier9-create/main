import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
export class UpdateVinylDto {
  @ApiProperty({ description: 'Name of the vinyl', example: 'The Beatles - Sgt. Pepper\'s Lonely Hearts Club' })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Author name of the vinyl', example: 'John Lennon, Paul McCartney, George Harrison, Pete Best' })
  @IsString()
  authorName?: string;

  @ApiProperty({ description: 'Description of the vinyl', example: 'The Beatles - Sgt. Pepper\'s Lonely Hearts Club is the eighth studio album by the English rock band The Beatles, released on 1 June 1967.' })
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Price of the vinyl', example: 25.99 })
  @IsNumber()
  price?: number;
}


