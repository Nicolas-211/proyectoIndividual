import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBodegaDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la bodega es obligatorio' })
  @MaxLength(50, { message: 'El nombre no puede superar los 50 caracteres' })
  nombre: string;
}
