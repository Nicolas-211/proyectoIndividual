import { Module } from '@nestjs/common';
import { ProductoBodegaService } from './producto-bodega.service';
import { ProductoBodegaController } from './producto-bodega.controller';
import { ProductoBodega } from '../entities/producto-bodega.entity';
import { Bodega } from '../entities/bodega.entity';
import { Product } from '../entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductoBodega,
      Bodega,
      Product
    ]),
  ],
  providers: [ProductoBodegaService],
  controllers: [ProductoBodegaController],
  exports: [ProductoBodegaService],
})
export class ProductoBodegaModule {}
