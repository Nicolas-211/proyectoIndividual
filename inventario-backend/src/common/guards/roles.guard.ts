import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta NO tiene roles -> permitir acceso
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.rol || !user.rol.nombre) {
      throw new ForbiddenException('No autorizado');
    }

    const tieneRol = roles.includes(user.rol.nombre);

    if (!tieneRol) {
      throw new ForbiddenException('No tienes permisos para acceder');
    }

    return true;
  }
}
