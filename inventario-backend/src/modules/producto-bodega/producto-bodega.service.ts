import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductoBodega } from '../entities/producto-bodega.entity';
import { CreateProductoBodegaDto } from '../dto/create-producto-bodega.dto';
import { UpdateProductoBodegaDto } from '../dto/update-producto-bodega.dto';
import { Bodega } from '../entities/bodega.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductoBodegaService {
  constructor(
    @InjectRepository(ProductoBodega)
    private readonly productoBodegaRepo: Repository<ProductoBodega>,

    @InjectRepository(Bodega)
    private readonly bodegaRepo: Repository<Bodega>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  // ===============================
  // GET ALL
  // ===============================
  findAll() {
    return this.productoBodegaRepo.find({
      relations: ['producto', 'bodega'],
    });
  }

  // ===============================
  // GET ONE
  // ===============================
  async findOne(id: number) {
    const relacion = await this.productoBodegaRepo.findOne({
      where: { id },
      relations: ['producto', 'bodega'],
    });

    if (!relacion) {
      throw new NotFoundException(`No existe producto-bodega con id ${id}`);
    }

    return relacion;
  }

  // ===============================
  // CREATE
  // ===============================
  async create(dto: CreateProductoBodegaDto) {
    // 1) Validar existencia de bodega
    const bodega = await this.bodegaRepo.findOne({
      where: { id: dto.bodega_id },
    });
    if (!bodega) throw new BadRequestException('La bodega no existe');

    // 2) Validar existencia de producto
    const producto = await this.productRepo.findOne({
      where: { id: dto.prod_id },
    });
    if (!producto)
      throw new BadRequestException('El producto no existe');

    // 3) Validar duplicado
    const existe = await this.productoBodegaRepo.findOne({
      where: {
        bodega: { id: dto.bodega_id },
        producto: { id: dto.prod_id },
      },
      relations: ['bodega', 'producto'],
    });

    if (existe) {
      throw new BadRequestException(
        'Ese producto ya está asociado a esa bodega',
      );
    }

    // 4) Crear relación
    const nuevo = this.productoBodegaRepo.create({
      bodega,
      producto,
      stockInicial: dto.pg_stock_inicial,
      stockActual: dto.pg_stock_actual ?? dto.pg_stock_inicial,
    });

    return this.productoBodegaRepo.save(nuevo);
  }

  // ===============================
  // UPDATE
  // ===============================
  async update(id: number, dto: UpdateProductoBodegaDto) {
    const relacion = await this.findOne(id);

    // Actualización de stock
    relacion.stockInicial =
      dto.pg_stock_inicial ?? relacion.stockInicial;

    relacion.stockActual =
      dto.pg_stock_actual ?? relacion.stockActual;

    // Permitir cambiar bodega (opcional)
    if (dto.bodega_id) {
      const nuevaBodega = await this.bodegaRepo.findOne({
        where: { id: dto.bodega_id },
      });
      if (!nuevaBodega) {
        throw new BadRequestException('La nueva bodega no existe');
      }
      relacion.bodega = nuevaBodega;
    }

    // Permitir cambiar producto (opcional)
    if (dto.prod_id) {
      const nuevoProducto = await this.productRepo.findOne({
        where: { id: dto.prod_id },
      });
      if (!nuevoProducto) {
        throw new BadRequestException('El nuevo producto no existe');
      }
      relacion.producto = nuevoProducto;
    }

    return this.productoBodegaRepo.save(relacion);
  }

  // ===============================
  // DELETE
  // ===============================
  async remove(id: number) {
    const relacion = await this.findOne(id);
    await this.productoBodegaRepo.remove(relacion);

    return { deleted: true };
  }

  async findByBodega(bodegaId: number) {
  return this.productoBodegaRepo.find({
    where: { bodega: { id: bodegaId } },
    relations: ['producto', 'bodega'],
  });
}

}
