import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional() @IsEmail() @MaxLength(150)
  email?: string;

  @IsOptional() @IsString() @MaxLength(100)
  nombre?: string;

  @IsOptional() @IsString() @MaxLength(100)
  apPaterno?: string;

  @IsOptional() @IsString() @MaxLength(100)
  apMaterno?: string;
}
