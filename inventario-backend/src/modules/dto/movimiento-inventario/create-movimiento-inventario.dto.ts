import { IsEnum, IsNumber, IsUUID, IsInt } from 'class-validator';

export class CreateMovimientoInventarioDto {
  @IsInt()
  pb_id: number;

  @IsEnum(['entrada', 'salida', 'ajuste'])
  tipo: 'entrada' | 'salida' | 'ajuste';

  @IsNumber()
  cantidad: number;

  @IsUUID()
  usuario_id: string;  // <-- CORREGIDO
}
