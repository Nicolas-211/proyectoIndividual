import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bodega' })
export class Bodega {
  @PrimaryGeneratedColumn({ name: 'bodega_id' })
  id: number;

  @Column({ name: 'bodega_nombre', type: 'varchar', length: 50 })
  nombre: string;
}
