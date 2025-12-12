import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioBodega } from '../entities/usuario-bodega.entity';
import { User } from '../entities/user.entity';
import { Bodega } from '../entities/bodega.entity';
import { UsuarioBodegaService } from './usuario-bodega.service';
import { UsuarioBodegaController } from './usuario-bodega.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioBodega, User, Bodega])],
  controllers: [UsuarioBodegaController],
  providers: [UsuarioBodegaService],
  exports: [UsuarioBodegaService],
})
export class UsuarioBodegaModule {}
