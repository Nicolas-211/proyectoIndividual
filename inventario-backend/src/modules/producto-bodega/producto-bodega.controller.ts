import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductoBodegaService } from './producto-bodega.service';
import { CreateProductoBodegaDto } from '../dto/create-producto-bodega.dto';
import { UpdateProductoBodegaDto } from '../dto/update-producto-bodega.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
@Controller('producto-bodega')
export class ProductoBodegaController {

    constructor(
        private readonly productoBodegaService: ProductoBodegaService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll() {
        const data = await this.productoBodegaService.findAll();

        return {
            ok: true,
            total: data.length,
            data,
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.productoBodegaService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('admin', 'bodeguero')
    @Post()
    async create(@Body() body: CreateProductoBodegaDto) {
        const data = await this.productoBodegaService.create(body);

        return {
            ok: true,
            message: 'Producto asignado a la bodega correctamente',
            data,
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('admin', 'bodeguero')
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductoBodegaDto) {
        return this.productoBodegaService.update(id, body);
    }
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin', 'bodeguero')
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.productoBodegaService.remove(id);

        return {
            ok: true,
            message: 'Relación eliminada exitosamente',
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('bodega/:bodegaId')
    async getByBodega(
        @Param('bodegaId', ParseIntPipe) bodegaId: number
    ) {
        const data = await this.productoBodegaService.findByBodega(bodegaId);

        return {
            ok: true,
            total: data.length,
            data,
        };
    }


}
