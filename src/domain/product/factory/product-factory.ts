import { randomUUID } from 'crypto';
import { IProduct } from '../interface/product';
import { Product } from '../entity/product';

export class ProductFactory {
  static create(name: string, price: number): IProduct {
    return new Product(randomUUID(), name, price);
  }
}
