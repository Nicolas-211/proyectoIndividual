import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
  @Get()
  getAll() {
    return this.rolesService.findAll();
  }
}
