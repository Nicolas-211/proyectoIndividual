import { Module } from '@nestjs/common';
import { BodegasService } from './bodegas.service';
import { BodegasController } from './bodegas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bodega } from '../entities/bodega.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bodega])],
  providers: [BodegasService],
  controllers: [BodegasController],
  exports:[BodegasService]
})
export class BodegasModule {}
