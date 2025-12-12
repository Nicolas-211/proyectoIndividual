import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET!,
        });

    }

    async validate(payload: any) {
        // Aquí lo que retornes queda disponible en req.user
        return {
            id: payload.sub,
            login: payload.login,
            rol: payload.rol,
            rol_id: payload.rol_id,
        };
    }
}
