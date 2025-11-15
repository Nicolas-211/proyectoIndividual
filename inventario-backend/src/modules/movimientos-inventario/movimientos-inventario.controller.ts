import { Body, Controller, Get, Param, ParseIntPipe, Post, Delete } from '@nestjs/common';
import { MovimientosInventarioService } from './movimientos-inventario.service';
import { CreateMovimientoInventarioDto } from '../dto//movimiento-inventario/create-movimiento-inventario.dto';

@Controller('movimientos-inventario')
export class MovimientosInventarioController {
  constructor(private readonly service: MovimientosInventarioService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMovimientoInventarioDto) {
    return this.service.create(dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
