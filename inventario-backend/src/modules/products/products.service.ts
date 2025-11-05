import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';



@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) { }

    findAll() {
        return this.productRepo.find();
    }

    async findOne(id: string) {
        const prod = await this.productRepo.findOne({ where: { id } });
        if (!prod) {
            throw new NotFoundException('Producto no encontrado');
        }
        return prod;
    }

    async create(dto: CreateProductDto) {
        const entity = this.productRepo.create({
            id: dto.id,
            nombre: dto.nombre,

        });

        return this.productRepo.save(entity)
    }

    async update(id: string, dto: UpdateProductDto) {
        const prod = await this.findOne(id);
        Object.assign(prod, dto);
        return this.productRepo.save(prod);
    }

    async remove(id: string) {
        const prod = await this.findOne(id);
        await this.productRepo.remove(prod);
        return { deleted: true };
    }
}
