import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';

import { ProductoBodega } from '../entities/producto-bodega.entity';
import { Bodega } from '../entities/bodega.entity';
import { Product } from '../entities/product.entity';
import { MovimientoInventario } from '../entities/movimiento-inventario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductoBodega,
      Bodega,
      Product,
      MovimientoInventario,
    ]),
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
