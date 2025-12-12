// src/entities/usuario-bodega.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Bodega } from './bodega.entity';

@Entity({ name: 'usuario_bodega' })
export class UsuarioBodega {
  @PrimaryGeneratedColumn({ name: 'ub_id' })
  id: number;

  @ManyToOne(() => User, (u) => u.usuarioBodegas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToOne(() => Bodega, (b) => b.usuarioBodegas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bodega_id' })
  bodega: Bodega;
  
  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;
}
