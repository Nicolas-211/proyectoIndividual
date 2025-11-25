import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateDevolucionDto {
  @IsNumber()
  pb_id: number;

  @IsNumber()
  cantidad: number;

  @IsString()
  motivo: string;

  @IsUUID()
  usuario_id: string;
}
