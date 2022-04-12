import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/categories.dto';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'Description 1',
    },
  ];
  findAll(): Category[] {
    return this.categories;
  }
  findOne(id: number): Category {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }
  create(payload: CreateCategoryDto) {
    this.counterId++;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (category) {
      const index = this.categories.indexOf(category);
      this.categories[index] = {
        ...category,
        ...payload,
      };
      return this.categories[index];
    } else {
      return null;
    }
  }
  delete(id: number): Category {
    const category = this.findOne(id);
    const index = this.categories.indexOf(category);
    this.categories.splice(index, 1);
    return category;
  }
}
