import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload = {
      sub: user.id,
      email: user.email,
      rol: user.rol?.nombre ?? null,
      rol_id: user.rol?.id ?? null,
      nombre: user.nombre,
      apPaterno: user.apPaterno,
      apMaterno: user.apMaterno,
    };

    return {
      access_token: await this.jwt.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        nombreCompleto: `${user.nombre} ${user.apPaterno} ${user.apMaterno}`.trim(),
        rol: user.rol?.nombre ?? null,
      },
    };
  }
}
