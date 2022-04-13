import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(private readonly productsService: ProductsService) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'User 1',
      email: 'user@user.com',
      password: '123456',
      createdAt: new Date(),
    },
  ];
  findAll(): User[] {
    return this.users;
  }
  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  create(payload: CreateUserDto) {
    this.counterId++;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.indexOf(user);
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    } else {
      return null;
    }
  }
  delete(id: number): User {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    return user;
  }

  getOrdersByUserId(userId: number): Order {
    const user = this.findOne(userId);
    return {
      createdAt: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
