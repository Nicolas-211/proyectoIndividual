import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { UsuarioBodega } from './usuario-bodega.entity';
@Entity({ name: 'bodega' })
export class Bodega {
  @PrimaryGeneratedColumn({ name: 'bodega_id' })
  id: number;

  @Column({ name: 'bodega_nombre', type: 'varchar', length: 50 })
  nombre: string;


  @OneToMany(() => UsuarioBodega, (ub) => ub.bodega)
  usuarioBodegas: UsuarioBodega[];
}
