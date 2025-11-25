import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevolucionesService } from './devoluciones.service';
import { DevolucionesController } from './devoluciones.controller';

import { Devolucion } from '../entities/devoluciones/devolucion.entity';
import { ProductoBodega } from '../entities/producto-bodega.entity';
import { User } from '../entities/user.entity';
import { MovimientoInventario } from '../entities/movimiento-inventario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Devolucion,
      ProductoBodega,
      User,
      MovimientoInventario
    ]),
  ],
  controllers: [DevolucionesController],
  providers: [DevolucionesService],
  exports: [DevolucionesService],
})
export class DevolucionesModule {}
