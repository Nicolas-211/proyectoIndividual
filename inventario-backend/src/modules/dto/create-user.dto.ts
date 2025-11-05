import { IsString, IsNotEmpty, MinLength, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsOptional()
  @IsNumber()
  rol_id?: number;
}
