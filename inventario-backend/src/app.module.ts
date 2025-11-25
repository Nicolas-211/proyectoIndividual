import { RolesModule } from './modules/roles/roles.module';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './database/typeorm.config';
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { BodegasModule } from './modules/bodegas/bodegas.module';
import { ProductoBodegaModule } from './modules/producto-bodega/producto-bodega.module';
import { MovimientosInventarioModule } from './modules/movimientos-inventario/movimientos-inventario.module';
import { DevolucionesModule } from './modules/devoluciones/devoluciones.module';
import { ReportesModule } from './modules/reportes/reportes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ProductsModule,
    RolesModule,
    UsersModule,
    AuthModule,
    BodegasModule,
    ProductoBodegaModule,
    MovimientosInventarioModule,
    DevolucionesModule,
    ReportesModule,
  ],
})
export class AppModule {}
