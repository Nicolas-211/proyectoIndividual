import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Bodega } from './bodega.entity';
import { Product } from './product.entity';

@Entity({ name: 'producto_bodega' })
export class ProductoBodega {
  @PrimaryGeneratedColumn({ name: 'pb_id' })
  id: number;

  @ManyToOne(() => Bodega)
  @JoinColumn({ name: 'bodega_id' })
  bodega: Bodega;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'prod_id' })
  producto: Product;

  @Column({ name: 'pg_stock_inicial', type: 'float' })
  stockInicial: number;

  @Column({ name: 'pg_stock_actual', type: 'float' })
  stockActual: number;
}
