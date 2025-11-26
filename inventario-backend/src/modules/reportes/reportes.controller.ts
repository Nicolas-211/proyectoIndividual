import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) { }

  // 1) STOCK POR BODEGA
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Get('stock-por-bodega')
  stockPorBodega() {
    return this.reportesService.stockPorBodega();
  }

  // 2) STOCK TOTAL POR PRODUCTO
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Get('stock-total-productos')
  stockTotal() {
    return this.reportesService.stockTotalProductos();
  }

  // 3) MOVIMIENTOS ENTRE FECHAS
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Get('movimientos')
  movimientos(
    @Query('desde') desde: string,
    @Query('hasta') hasta: string,
  ) {
    return this.reportesService.movimientosPorFechas(
      new Date(desde),
      new Date(hasta),
    );
  }

  // 4) STOCK CRÍTICO
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Get('stock-critico')
  stockCritico(@Query('min') min?: string) {
    return this.reportesService.stockCritico(min ? Number(min) : 5);
  }

  @Get('sin-stock')
  sinStock() {
    return this.reportesService.productosSinStock();
  }
@UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'bodeguero')
  @Get('rotacion')
  rotacion() {
    return this.reportesService.rotacionInventario();
  }

}

