import { Product } from '../entity/product';
import { Repository } from './repository';

export interface ProductRepository extends Repository<Product> {
  create(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  find(id: string): Promise<Product>;
  findAll(): Promise<Product[]>;
}
