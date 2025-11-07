import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async create(dto: CreateUserDto) {
    const exists = await this.findByEmail(dto.email);
    if (exists) throw new BadRequestException('Email ya está en uso');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(dto.password, salt);

    const user = this.userRepo.create({
      email: dto.email,
      password: hashed,
      nombre: dto.nombre,
      apPaterno: dto.apPaterno,
      apMaterno: dto.apMaterno,
    });

    if (dto.rol_id) {
      const rol = await this.rolesService.findById(dto.rol_id);
      user.rol = rol ?? null;
    }

    return this.userRepo.save(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (dto.email && dto.email !== user.email) {
      const exists = await this.findByEmail(dto.email);
      if (exists) throw new BadRequestException('Email ya está en uso');
      user.email = dto.email;
    }

    if (dto.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(dto.password, salt);
    }

    if (dto.nombre !== undefined) user.nombre = dto.nombre;
    if (dto.apPaterno !== undefined) user.apPaterno = dto.apPaterno;
    if (dto.apMaterno !== undefined) user.apMaterno = dto.apMaterno;

    if (dto.rol_id) {
      const rol = await this.rolesService.findById(dto.rol_id);
      user.rol = rol ?? null;
    }

    return this.userRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
    return { deleted: true };
  }
}
