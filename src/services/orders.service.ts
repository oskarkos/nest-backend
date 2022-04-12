import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/dtos/orders.dto';
import { Order } from 'src/entities/order.entity';

@Injectable()
export class OrdersService {
  private counterId = 1;
  private orders: Order[] = [
    {
      id: 1,
      userId: 1,
      productId: 1,
      quantity: 1,
      total: 100,
      createdAt: new Date(),
    },
  ];
  findAll(): Order[] {
    return this.orders;
  }
  findOne(id: number): Order {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }
  create(payload: CreateOrderDto) {
    this.counterId++;
    const newOrder = {
      id: this.counterId,
      ...payload,
    };
    this.orders.push(newOrder);
    return newOrder;
  }
  update(id: number, payload: UpdateOrderDto) {
    const order = this.findOne(id);
    if (order) {
      const index = this.orders.indexOf(order);
      this.orders[index] = {
        ...order,
        ...payload,
      };
      return this.orders[index];
    } else {
      return null;
    }
  }
  delete(id: number): Order {
    const order = this.findOne(id);
    const index = this.orders.indexOf(order);
    this.orders.splice(index, 1);
    return order;
  }
}
