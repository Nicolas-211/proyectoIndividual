import { Module } from '@nestjs/common';
import { ProductoBodegaService } from './producto-bodega.service';
import { ProductoBodegaController } from './producto-bodega.controller';

@Module({
  providers: [ProductoBodegaService],
  controllers: [ProductoBodegaController]
})
export class ProductoBodegaModule {}
