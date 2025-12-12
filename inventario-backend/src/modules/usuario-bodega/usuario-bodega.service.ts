import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioBodega } from '../entities/usuario-bodega.entity';
import { User } from '../entities/user.entity';
import { Bodega } from '../entities/bodega.entity';

@Injectable()
export class UsuarioBodegaService {
    constructor(
        @InjectRepository(UsuarioBodega)
        private ubRepo: Repository<UsuarioBodega>,

        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(Bodega)
        private bodegaRepo: Repository<Bodega>,
    ) { }

    async asignarBodega(data: { usuarioId: string; bodegaId: number; rolEnBodega?: string }) {
        const usuario = await this.userRepo.findOne({ where: { id: data.usuarioId } });
        if (!usuario) throw new NotFoundException('Usuario no encontrado');

        const bodega = await this.bodegaRepo.findOne({ where: { id: data.bodegaId } });
        if (!bodega) throw new NotFoundException('Bodega no encontrada');

        const relacion = this.ubRepo.create({
            usuario: { id: data.usuarioId } as any,
            bodega: { id: data.bodegaId } as any,
        });


        return this.ubRepo.save(relacion);
    }

    async obtenerBodegasPorUsuario(usuarioId: string) {
        const usuario = await this.userRepo.findOne({
            where: { id: usuarioId },
            relations: ['usuarioBodegas', 'usuarioBodegas.bodega'],
        });

        if (!usuario) throw new NotFoundException('Usuario no encontrado');

        return usuario.usuarioBodegas.map((ub) => ({
            idRelacion: ub.id,
            bodegaId: ub.bodega.id,
            nombre: ub.bodega.nombre,
            creadoEn: ub.creadoEn,
        }));
    }

    async eliminarAsociacion(id: number) {
        const existe = await this.ubRepo.findOne({ where: { id } });
        if (!existe) throw new NotFoundException('Asociación no encontrada');

        return this.ubRepo.delete(id);
    }
}
