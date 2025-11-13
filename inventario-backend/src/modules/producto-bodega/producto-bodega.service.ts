import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoBodegaDto } from '../dto/create-producto-bodega.dto';
import { UpdateProductoBodegaDto } from '../dto/update-producto-bodega.dto';
import { ProductoBodega } from '../entities/producto-bodega.entity';
@Injectable()
export class ProductoBodegaService {

    constructor(
        @InjectRepository(ProductoBodega)
        private readonly productoBodegaRepo: Repository<ProductoBodega>,
    ) { }

    findAll() {
        return this.productoBodegaRepo.find();
    }

    async findOne(id: number) {
        const relacion = await this.productoBodegaRepo.findOne({
            where: { id },
            relations: ['producto', 'bodega'], // opcional: para traer los datos relacionados
        });

        if (!relacion) {
            throw new NotFoundException(`No se encontró la relación con id ${id}`);
        }

        return relacion;
    }

    async create(dto: CreateProductoBodegaDto) {
        const existe = await this.productoBodegaRepo.findOne({
            where: {
                bodega: { id: dto.bodega_id },
                producto: { id: dto.prod_id },
            },
        });

        if (existe) {
            throw new BadRequestException('Ya existe ese producto en la bodega seleccionada');
        }

        const nuevo = this.productoBodegaRepo.create({
            bodega: { id: dto.bodega_id },
            producto: { id: dto.prod_id },
            stockInicial: dto.pg_stock_inicial,
            stockActual: dto.pg_stock_actual ?? dto.pg_stock_inicial, // 👈 si no viene stock_actual, usamos el inicial
        });

        return this.productoBodegaRepo.save(nuevo);

    }

    async update(id: number, dto: UpdateProductoBodegaDto) {
        const ProductoBodega = await this.findOne(id);
        if (!ProductoBodega) {
            throw new BadRequestException('No existe ese producto en la bodega seleccionada');
        }

        return this.productoBodegaRepo.save(ProductoBodega);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        await this.productoBodegaRepo.remove(user);
        return { deleted: true };
    }
}
