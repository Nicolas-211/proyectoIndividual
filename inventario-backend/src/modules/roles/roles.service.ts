import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  findAll() {
    return this.roleRepo.find();
  }

  findById(id: number) {
    return this.roleRepo.findOne({ where: { id } }); // Role | null
  }

  // ✅ ESTE ES EL MÉTODO QUE FALTABA
  async findByIdOrThrow(id: number): Promise<Role> {
    const role = await this.roleRepo.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException(`El rol con ID ${id} no existe.`);
    }

    return role; // <- siempre Role, nunca null
  }
}
