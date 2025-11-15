import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductoBodega } from '../entities/producto-bodega.entity';
import { User } from '../entities/user.entity';

@Entity({ name: 'movimiento_inventario' })
export class MovimientoInventario {
  @PrimaryGeneratedColumn({ name: 'mov_id' })
  id: number;

  @ManyToOne(() => ProductoBodega)
  @JoinColumn({ name: 'pb_id' })
  productoBodega: ProductoBodega;

  @Column({ name: 'tipo', type: 'varchar', length: 20 })
  tipo: 'entrada' | 'salida' | 'ajuste';

  @Column({ name: 'cantidad', type: 'float' })
  cantidad: number;

  @Column({ name: 'stock_anterior', type: 'float' })
  stockAnterior: number;

  @Column({ name: 'stock_nuevo', type: 'float' })
  stockNuevo: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @Column({ name: 'fecha', type: 'timestamp', default: () => 'NOW()' })
  fecha: Date;
}
