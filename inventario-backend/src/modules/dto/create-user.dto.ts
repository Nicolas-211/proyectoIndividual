import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString() @IsNotEmpty() @MaxLength(100)
  nombre: string;

  @IsString() @IsNotEmpty() @MaxLength(100)
  apPaterno: string;

  @IsString() @IsNotEmpty() @MaxLength(100)
  apMaterno: string;

  @IsOptional()
  @IsNumber()
  rol_id?: number;
}
