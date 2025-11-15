import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MovimientoInventario } from '../entities/movimiento-inventario.entity';
import { CreateMovimientoInventarioDto } from '../dto/movimiento-inventario/create-movimiento-inventario.dto';
import { ProductoBodega } from '../entities/producto-bodega.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class MovimientosInventarioService {
  constructor(
    @InjectRepository(MovimientoInventario)
    private readonly movRepo: Repository<MovimientoInventario>,

    @InjectRepository(ProductoBodega)
    private readonly pbRepo: Repository<ProductoBodega>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // GET ALL
  findAll() {
    return this.movRepo.find({
      relations: ['productoBodega', 'usuario'],
      order: { fecha: 'DESC' },
    });
  }

  // GET ONE
  async findOne(id: number) {
    const mov = await this.movRepo.findOne({
      where: { id },
      relations: ['productoBodega', 'usuario'],
    });

    if (!mov) throw new NotFoundException('Movimiento no encontrado');
    return mov;
  }

  // CREATE
  async create(dto: CreateMovimientoInventarioDto) {
    const pb = await this.pbRepo.findOne({
      where: { id: dto.pb_id },
      relations: ['producto', 'bodega'],
    });

    if (!pb) throw new BadRequestException('La relación producto-bodega no existe');

    const usuario = await this.userRepo.findOne({ where: { id: dto.usuario_id } });
    if (!usuario) throw new BadRequestException('El usuario no existe');

    let stockNuevo = pb.stockActual;
    const stockAnterior = pb.stockActual;

    // LÓGICA DEL INVENTARIO
    if (dto.tipo === 'entrada') {
      stockNuevo = pb.stockActual + dto.cantidad;
    } else if (dto.tipo === 'salida') {
      if (pb.stockActual < dto.cantidad)
        throw new BadRequestException('Stock insuficiente');
      stockNuevo = pb.stockActual - dto.cantidad;
    } else if (dto.tipo === 'ajuste') {
      stockNuevo = dto.cantidad;
    }

    // ACTUALIZAR STOCK
    pb.stockActual = stockNuevo;
    await this.pbRepo.save(pb);

    // GUARDAR MOVIMIENTO
    const mov = this.movRepo.create({
      productoBodega: pb,
      tipo: dto.tipo,
      cantidad: dto.cantidad,
      usuario: usuario,
      stockAnterior,
      stockNuevo,
    });

    return this.movRepo.save(mov);
  }

  // DELETE
  async remove(id: number) {
    const mov = await this.findOne(id);
    await this.movRepo.remove(mov);
    return { deleted: true };
  }
}
