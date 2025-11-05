import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'rol' })
export class Role {
  @PrimaryGeneratedColumn({ name: 'rol_id' })
  id: number;

  @Column({ name: 'rol_nombre', type: 'varchar', length: 50, unique: true })
  nombre: string;
}
