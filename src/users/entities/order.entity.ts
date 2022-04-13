import { User } from './user.entity';
import { Product } from 'src/products/entities/product.entity';

export type Order = {
  createdAt: Date;
  user: User;
  products: Product[];
};
