import { Repository } from '../../@shared/repository/repository';
import { Product } from '../entity/product';

export interface ProductRepository extends Repository<Product> {
  create(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  find(id: string): Promise<Product>;
  findAll(limit?: number, offset?: number): Promise<Product[]>;
}
