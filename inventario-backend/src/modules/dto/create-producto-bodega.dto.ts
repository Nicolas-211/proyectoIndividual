import { IsInt, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateProductoBodegaDto {
  @IsInt()
  bodega_id: number;

  @IsUUID()
  prod_id: string;

  @IsNumber()
  pg_stock_inicial: number;

  @IsOptional()
  @IsNumber()
  pg_stock_actual?: number;
}
