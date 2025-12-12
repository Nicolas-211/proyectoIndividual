import { IsUUID, IsInt, IsOptional, IsString } from 'class-validator';


export class AssignUserBodegaDto {
@IsUUID()
usuario_id: string;


@IsOptional()
@IsString()
rolEnBodega?: string;
}