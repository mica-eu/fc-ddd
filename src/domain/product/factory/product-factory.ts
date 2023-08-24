import { randomUUID } from 'crypto';
import { Product } from '../entity/product';

export class ProductFactory {
  static create(name: string, price: number): Product {
    return new Product(randomUUID(), name, price);
  }
}
