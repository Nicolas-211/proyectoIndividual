import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bodega } from '../entities/bodega.entity';
import { CreateBodegaDto } from '../dto/create-bodega.dto';
import { UpdateBodegaDto } from '../dto/update-bodega.dto';

@Injectable()
export class BodegasService {
  constructor(
    @InjectRepository(Bodega)
    private readonly bodegaRepo: Repository<Bodega>,
  ) {}

  findAll() {
    return this.bodegaRepo.find();
  }

  async findOne(id: number) {
    const bodega = await this.bodegaRepo.findOne({ where: { id } });
    if (!bodega) throw new NotFoundException('Bodega no encontrada');
    return bodega;
  }

  async create(dto: CreateBodegaDto) {
    const existe = await this.bodegaRepo.findOne({ where: { nombre: dto.nombre } });
    if (existe) throw new BadRequestException('Ya existe una bodega con ese nombre');

    const entity = this.bodegaRepo.create({ nombre: dto.nombre });
    return this.bodegaRepo.save(entity);
  }

  async update(id: number, dto: UpdateBodegaDto) {
    const bodega = await this.findOne(id);
    Object.assign(bodega, dto);
    return this.bodegaRepo.save(bodega);
  }

  async remove(id: number) {
    const bodega = await this.findOne(id);
    await this.bodegaRepo.remove(bodega);
    return { deleted: true };
  }
}
