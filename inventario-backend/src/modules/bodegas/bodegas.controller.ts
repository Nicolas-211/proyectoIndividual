import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BodegasService } from './bodegas.service';
import { CreateBodegaDto } from '../dto/create-bodega.dto';
import { UpdateBodegaDto } from '../dto/update-bodega.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('bodegas')
export class BodegasController {
  constructor(private readonly bodegaService: BodegasService) {}

  // ======================
  // VER TODAS LAS BODEGAS
  // ======================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Get()
  getAll() {
    return this.bodegaService.findAll();
  }

  // ======================
  // VER UNA BODEGA
  // ======================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.bodegaService.findOne(id);
  }

  // ======================
  // CREAR BODEGA
  // ======================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Post()
  create(@Body() body: CreateBodegaDto) {
    return this.bodegaService.create(body);
  }

  // ======================
  // EDITAR BODEGA
  // ======================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBodegaDto,
  ) {
    return this.bodegaService.update(id, body);
  }

  // ======================
  // ELIMINAR BODEGA (SOLO ADMIN)
  // ======================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bodegaService.remove(id);
  }
}
