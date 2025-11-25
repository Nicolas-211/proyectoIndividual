import { Controller, Get, Query } from '@nestjs/common';
import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) { }

  // 1) STOCK POR BODEGA
  @Get('stock-por-bodega')
  stockPorBodega() {
    return this.reportesService.stockPorBodega();
  }

  // 2) STOCK TOTAL POR PRODUCTO
  @Get('stock-total-productos')
  stockTotal() {
    return this.reportesService.stockTotalProductos();
  }

  // 3) MOVIMIENTOS ENTRE FECHAS
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
  @Get('stock-critico')
  stockCritico(@Query('min') min?: string) {
    return this.reportesService.stockCritico(min ? Number(min) : 5);
  }

  @Get('sin-stock')
  sinStock() {
    return this.reportesService.productosSinStock();
  }

  @Get('rotacion')
  rotacion() {
    return this.reportesService.rotacionInventario();
  }

}
