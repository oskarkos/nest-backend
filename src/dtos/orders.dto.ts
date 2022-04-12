import { IsNumber, IsNotEmpty, IsPositive, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly userId: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly productId: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly quantity: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly total: number;
  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
