import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ProductoBodega } from '../../entities/producto-bodega.entity';
import { User } from '../../entities/user.entity';

@Entity({ name: 'devolucion' })
export class Devolucion {
  @PrimaryGeneratedColumn({ name: 'dev_id' })
  id: number;

  @ManyToOne(() => ProductoBodega)
  @JoinColumn({ name: 'pb_id' })
  productoBodega: ProductoBodega;

  @Column({ name: 'cantidad', type: 'float' })
  cantidad: number;

  @Column({ name: 'motivo', type: 'varchar', length: 255 })
  motivo: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @Column({ name: 'fecha', type: 'timestamp', default: () => 'NOW()' })
  fecha: Date;
}
