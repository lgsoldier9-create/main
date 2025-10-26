import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
export class CreateVinylDto {
  @IsString()
  name: string;

  @IsString()
  authorName: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
