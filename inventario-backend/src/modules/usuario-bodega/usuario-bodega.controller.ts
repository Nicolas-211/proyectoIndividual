import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UsuarioBodegaService } from './usuario-bodega.service';

@Controller('usuario-bodega')
export class UsuarioBodegaController {
  constructor(private readonly ubService: UsuarioBodegaService) {}

  @Post()
  asignar(@Body() body: { usuarioId: string; bodegaId: number; rolEnBodega?: string }) {
    return this.ubService.asignarBodega(body);
  }

  @Get('usuario/:id')
  obtenerBodegas(@Param('id') usuarioId: string) {
    return this.ubService.obtenerBodegasPorUsuario(usuarioId);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.ubService.eliminarAsociacion(id);
  }
}
