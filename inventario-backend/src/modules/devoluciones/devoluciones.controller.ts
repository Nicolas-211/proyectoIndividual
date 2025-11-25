import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { DevolucionesService } from './devoluciones.service';
import { CreateDevolucionDto } from '../dto/devoluciones/create-devolucion.dto';
import { UpdateDevolucionDto } from '../dto/devoluciones/update-devolucion.dto';

@Controller('devoluciones')
export class DevolucionesController {
  constructor(private readonly devolucionesService: DevolucionesService) {}

  // =====================================
  // GET ALL
  // =====================================
  @Get()
  getAll() {
    return this.devolucionesService.findAll();
  }

  // =====================================
  // GET ONE
  // =====================================
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.devolucionesService.findOne(id);
  }

  // =====================================
  // CREATE
  // =====================================
  @Post()
  create(@Body() body: CreateDevolucionDto) {
    return this.devolucionesService.create(body);
  }

  // =====================================
  // DELETE
  // =====================================
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.devolucionesService.remove(id);
  }
}
