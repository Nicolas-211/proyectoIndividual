import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ============================
  // VER TODOS LOS PRODUCTOS
  // ============================
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  // ============================
  // VER UN PRODUCTO
  // ============================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'usuario', 'bodeguero')
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // ============================
  // CREAR PRODUCTO
  // ============================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'usuario', 'bodeguero')
  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  // ============================
  // EDITAR PRODUCTO
  // ============================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'usuario', 'bodeguero')
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productsService.update(id, body);
  }

  // ============================
  // ELIMINAR PRODUCTO
  // ============================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin', 'usuario', 'bodeguero')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
