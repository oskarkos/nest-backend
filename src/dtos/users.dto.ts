import { IsString, IsNotEmpty, IsEmail, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly password: string;
  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
