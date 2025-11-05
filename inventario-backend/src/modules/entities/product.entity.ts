import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'producto' })
export class Product {
  // tabla: producto.prod_id (varchar(11)) -> PK
  @PrimaryColumn({ name: 'prod_id', type: 'varchar', length: 11 })
  id: string;

  // tabla: producto.prod_nombre (varchar(200))
  @Column({ name: 'prod_nombre', type: 'varchar', length: 200 })
  nombre: string;
}
