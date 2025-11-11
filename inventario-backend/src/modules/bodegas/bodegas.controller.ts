import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
} from '@nestjs/common';
import { BodegasService } from './bodegas.service';
import { CreateBodegaDto } from '../dto/create-bodega.dto';
import { UpdateBodegaDto } from '../dto/update-bodega.dto';

@Controller('bodegas')
export class BodegasController {

    constructor(private readonly bodegaService: BodegasService) { }

    @Get()
    getAll() {
        return this.bodegaService.findAll();
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.bodegaService.findOne(id);
    }

    @Post()
    create(@Body() body: CreateBodegaDto) {
        return this.bodegaService.create(body);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateBodegaDto) {
        return this.bodegaService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.bodegaService.remove(id);
    }


}
