import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductoBodegaService } from './producto-bodega.service';
import { CreateProductoBodegaDto } from '../dto/create-producto-bodega.dto';
import { UpdateProductoBodegaDto } from '../dto/update-producto-bodega.dto';
@Controller('producto-bodega')
export class ProductoBodegaController {

    constructor(
        private readonly productoBodegaService: ProductoBodegaService
    ) { }

    @Get()
    async getAll() {
        const data = await this.productoBodegaService.findAll();

        return {
            ok: true,
            total: data.length,
            data,
        };
    }


    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.productoBodegaService.findOne(id);
    }

    @Post()
    create(@Body() body: CreateProductoBodegaDto) {
        const data = this.productoBodegaService.create(body)

        return {
            ok: true,
            message: 'Producto asignado a la bodega correctamente',
            data,
        };
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductoBodegaDto) {
        return this.productoBodegaService.update(id, body);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.productoBodegaService.remove(id);

        return {
            ok: true,
            message: 'Relación eliminada exitosamente',
        };
    }

}
