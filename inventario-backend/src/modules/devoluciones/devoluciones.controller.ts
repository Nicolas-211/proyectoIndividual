import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { DevolucionesService } from './devoluciones.service';
import { CreateDevolucionDto } from '../dto/devoluciones/create-devolucion.dto';
import { UpdateDevolucionDto } from '../dto/devoluciones/update-devolucion.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('devoluciones')
export class DevolucionesController {
  constructor(private readonly devolucionesService: DevolucionesService) {}

  // =====================================
  // GET ALL — SOLO ADMIN Y BODEGUERO
  // =====================================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Get()
  getAll() {
    return this.devolucionesService.findAll();
  }

  // =====================================
  // GET ONE — SOLO ADMIN Y BODEGUERO
  // =====================================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.devolucionesService.findOne(id);
  }

  // =====================================
  // CREATE — CUALQUIER ROL PUEDE DEVOLVER
  // =====================================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero', 'usuario')
  @Post()
  create(@Body() body: CreateDevolucionDto) {
    return this.devolucionesService.create(body);
  }

  // =====================================
  // DELETE — SOLO ADMIN
  // =====================================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.devolucionesService.remove(id);
  }
}
