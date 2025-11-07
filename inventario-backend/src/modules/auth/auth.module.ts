import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';  // 👈 tipo correcto
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

function resolveExpiresIn(): number | StringValue {
  const raw = process.env.JWT_EXPIRES ?? '1d';  // e.g., "1d", "12h", "3600"
  const n = Number(raw);
  // si es número -> segundos; si es string -> tiparlo como StringValue
  return Number.isNaN(n) ? (raw as StringValue) : n;
}

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev_secret',
      signOptions: { expiresIn: resolveExpiresIn() }, // ✅ number | StringValue
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
