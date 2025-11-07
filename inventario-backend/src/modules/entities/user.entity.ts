import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'usuario' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'usuario_id' })
  id: string;

  @Column({ name: 'usuario_email', type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ name: 'usuario_pass', type: 'varchar', length: 150 })
  password: string;

  @Column({ name: 'usuario_nombre', type: 'varchar', length: 100, default: '' })
  nombre: string;

  @Column({ name: 'usuario_ap_paterno', type: 'varchar', length: 100, default: '' })
  apPaterno: string;

  @Column({ name: 'usuario_ap_materno', type: 'varchar', length: 100, default: '' })
  apMaterno: string;

  @Column({ name: 'creado_en', type: 'timestamp', default: () => 'NOW()' })
  creadoEn: Date;

  @ManyToOne(() => Role, { eager: true, nullable: true })
  @JoinColumn({ name: 'rol_id' })
  rol: Role | null;

}
