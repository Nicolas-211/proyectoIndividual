import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';

import { ProductoBodega } from '../entities/producto-bodega.entity';
import { Bodega } from '../entities/bodega.entity';
import { Product } from '../entities/product.entity';
import { MovimientoInventario } from '../entities/movimiento-inventario.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(ProductoBodega)
    private readonly pbRepo: Repository<ProductoBodega>,

    @InjectRepository(Bodega)
    private readonly bodegaRepo: Repository<Bodega>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(MovimientoInventario)
    private readonly movRepo: Repository<MovimientoInventario>,
  ) {}

  // ================================================================
  // 1) STOCK POR BODEGA
  // ================================================================
  async stockPorBodega() {
    return this.pbRepo.find({
      relations: ['producto', 'bodega'],
      order: { bodega: { id: 'ASC' } },
    });
  }

  // ================================================================
  // 2) STOCK TOTAL POR PRODUCTO
  // ================================================================
 async stockTotalProductos() {
  const productos = await this.productRepo.find();

  const resultado: {
    producto_id: string;
    producto: string;
    stock_total: number;
  }[] = [];

  for (const prod of productos) {
    const registrosPB = await this.pbRepo.find({
      where: { producto: { id: prod.id } },
    });

    const total = registrosPB.reduce((s, r) => s + r.stockActual, 0);

    resultado.push({
      producto_id: prod.id,
      producto: prod.nombre,
      stock_total: total,
    });
  }

  return resultado;
}


  // ================================================================
  // 3) MOVIMIENTOS ENTRE FECHAS
  // ================================================================
  async movimientosPorFechas(desde: Date, hasta: Date) {
    return this.movRepo.find({
      where: { fecha: Between(desde, hasta) },
      relations: ['productoBodega', 'usuario'],
      order: { fecha: 'DESC' },
    });
  }

  // ================================================================
  // 4) STOCK CRÍTICO
  // ================================================================
  async stockCritico(minimo: number = 5) {
    const registros = await this.pbRepo.find({
      relations: ['producto', 'bodega'],
    });

    return registros.filter(r => r.stockActual <= minimo);
  }

    async productosSinStock() {
    const registrosPB = await this.pbRepo.find({
      relations: ['producto', 'bodega']
    });

    // sin stock actual
    return registrosPB.filter(r => r.stockActual <= 0);
  }

    async rotacionInventario() {
    return this.movRepo.find({
      relations: ['productoBodega', 'productoBodega.producto', 'productoBodega.bodega', 'usuario'],
      order: { fecha: 'DESC' }
    });
  }

}
