import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCustomertDto,
  UpdateCustomertDto,
} from 'src/users/dtos/customers.dto';
import { Customer } from 'src/users/entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Customer 1',
      email: 'customer@customer.com',
      phone: '12344320982',
      address: 'Address 1',
      city: 'City 1',
      state: 'State 1',
      zip: 'Zip 1',
      country: 'Country 1',
      createdAt: new Date(),
    },
  ];
  findAll(): Customer[] {
    return this.customers;
  }
  findOne(id: number): Customer {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }
  create(payload: CreateCustomertDto) {
    this.counterId++;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }
  update(id: number, payload: UpdateCustomertDto) {
    const customer = this.findOne(id);
    if (customer) {
      const index = this.customers.indexOf(customer);
      this.customers[index] = {
        ...customer,
        ...payload,
      };
      return this.customers[index];
    } else {
      return null;
    }
  }
  delete(id: number): Customer {
    const customer = this.findOne(id);
    const index = this.customers.indexOf(customer);
    this.customers.splice(index, 1);
    return customer;
  }
}
