import { Body, Controller, Get, Param, ParseIntPipe, Post, Delete, UseGuards } from '@nestjs/common';
import { MovimientosInventarioService } from './movimientos-inventario.service';
import { CreateMovimientoInventarioDto } from '../dto//movimiento-inventario/create-movimiento-inventario.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('movimientos-inventario')
export class MovimientosInventarioController {
  constructor(private readonly service: MovimientosInventarioService) { }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Get()
  getAll() {
    return this.service.findAll();
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }


  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Post()
  create(@Body() dto: CreateMovimientoInventarioDto) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}


