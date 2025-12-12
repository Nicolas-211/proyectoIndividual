import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ===============================
  // SOLO ADMIN PUEDE VER TODOS
  // ===============================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  // ===============================
  // SOLO ADMIN PUEDE VER UNO
  // ===============================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // ===============================
  // SOLO ADMIN PUEDE CREAR
  // ===============================
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  // ===============================
  // SOLO ADMIN PUEDE EDITAR
  // ===============================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  // ===============================
  // SOLO ADMIN PUEDE ELIMINAR
  // ===============================
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
