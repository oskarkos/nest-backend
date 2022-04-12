import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brands.dto';
import { Brand } from 'src/entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      description: 'Description 1',
    },
  ];
  findAll(): Brand[] {
    return this.brands;
  }
  findOne(id: number): Brand {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return brand;
  }
  create(payload: CreateBrandDto) {
    this.counterId++;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }
  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (brand) {
      const index = this.brands.indexOf(brand);
      this.brands[index] = {
        ...brand,
        ...payload,
      };
      return this.brands[index];
    } else {
      return null;
    }
  }
  delete(id: number): Brand {
    const brand = this.findOne(id);
    const index = this.brands.indexOf(brand);
    this.brands.splice(index, 1);
    return brand;
  }
}
