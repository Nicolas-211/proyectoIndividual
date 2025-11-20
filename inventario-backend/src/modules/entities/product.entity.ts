import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'producto' })
export class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'prod_id' })
  id: string; // 👈 ID automático (uuid)

  @Column({ name: 'prod_nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string;

  @Column({
    name: 'precio',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
  })
  precio: number;
}
