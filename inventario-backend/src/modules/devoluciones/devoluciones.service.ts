import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Devolucion } from '../entities/devoluciones/devolucion.entity';
import { CreateDevolucionDto } from '../dto/devoluciones/create-devolucion.dto';
import { UpdateDevolucionDto } from '../dto/devoluciones/update-devolucion.dto';
import { ProductoBodega } from '../entities/producto-bodega.entity';
import { User } from '../entities/user.entity';
import { MovimientoInventario } from '../entities/movimiento-inventario.entity';

@Injectable()
export class DevolucionesService {
  constructor(
    @InjectRepository(Devolucion)
    private readonly devolucionRepo: Repository<Devolucion>,

    @InjectRepository(ProductoBodega)
    private readonly pbRepo: Repository<ProductoBodega>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(MovimientoInventario)
    private readonly movRepo: Repository<MovimientoInventario>,
  ) {}

  // =================================
  // GET ALL
  // =================================
  findAll() {
    return this.devolucionRepo.find({
      relations: ['productoBodega', 'usuario'],
      order: { fecha: 'DESC' }
    });
  }

  // =================================
  // GET ONE
  // =================================
  async findOne(id: number) {
    const devolucion = await this.devolucionRepo.findOne({
      where: { id },
      relations: ['productoBodega', 'usuario']
    });

    if (!devolucion) {
      throw new NotFoundException('Devolución no encontrada');
    }

    return devolucion;
  }

  // =================================
  // CREATE (con movimiento + aumento de stock)
  // =================================
  async create(dto: CreateDevolucionDto) {
    // 1) Validar PB
    const pb = await this.pbRepo.findOne({
      where: { id: dto.pb_id },
      relations: ['producto', 'bodega']
    });

    if (!pb) {
      throw new BadRequestException('La relación producto-bodega no existe');
    }

    // 2) Validar usuario
    const usuario = await this.userRepo.findOne({
      where: { id: dto.usuario_id }
    });

    if (!usuario) {
      throw new BadRequestException('El usuario no existe');
    }

    const stockAnterior = pb.stockActual;
    const stockNuevo = stockAnterior + dto.cantidad;

    // 3) Actualizar stock
    pb.stockActual = stockNuevo;
    await this.pbRepo.save(pb);

    // 4) Crear movimiento automático tipo 'entrada'
    const mov = this.movRepo.create({
      productoBodega: pb,
      tipo: 'entrada',
      cantidad: dto.cantidad,
      usuario: usuario,
      stockAnterior,
      stockNuevo,
    });

    await this.movRepo.save(mov);

    // 5) Crear la devolución
    const devolucion = this.devolucionRepo.create({
      productoBodega: pb,
      cantidad: dto.cantidad,
      motivo: dto.motivo,
      usuario
    });

    return this.devolucionRepo.save(devolucion);
  }

  // =================================
  // DELETE
  // =================================
  async remove(id: number) {
    const dev = await this.findOne(id);
    await this.devolucionRepo.remove(dev);
    return { deleted: true };
  }
}
