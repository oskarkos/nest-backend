import { IsString, IsDate, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomertDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
  @IsString()
  @IsNotEmpty()
  readonly address: string;
  @IsString()
  @IsNotEmpty()
  readonly city: string;
  @IsString()
  @IsNotEmpty()
  readonly state: string;
  @IsString()
  @IsNotEmpty()
  readonly zip: string;
  @IsString()
  @IsNotEmpty()
  readonly country: string;
  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;
}

export class UpdateCustomertDto extends PartialType(CreateCustomertDto) {}
