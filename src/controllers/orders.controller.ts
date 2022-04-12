import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/dtos/orders.dto';
import { OrdersService } from 'src/services/orders.service';

@Controller('categories')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  getOrders() {
    return this.orderService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.delete(id);
  }
}
