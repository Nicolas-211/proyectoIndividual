import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoBodegaDto } from './create-producto-bodega.dto';

export class UpdateProductoBodegaDto extends PartialType(CreateProductoBodegaDto) {}
