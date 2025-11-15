import { Module } from '@nestjs/common';
import { MovimientosInventarioService } from './movimientos-inventario.service';
import { MovimientosInventarioController } from './movimientos-inventario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoInventario } from '../entities/movimiento-inventario.entity';
import { ProductoBodega } from '../entities/producto-bodega.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovimientoInventario, ProductoBodega, User]),
  ],
  controllers: [MovimientosInventarioController],
  providers: [MovimientosInventarioService],
  exports: [MovimientosInventarioService],
})
export class MovimientosInventarioModule {}
