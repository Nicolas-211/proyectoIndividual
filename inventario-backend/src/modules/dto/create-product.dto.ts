import { IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 11)
  id: string; // prod_id

  @IsString()
  @Length(1, 200)
  nombre: string; // prod_nombre
}
