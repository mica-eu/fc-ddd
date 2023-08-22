import { UUID } from 'crypto';
import { ProductRepository } from '../../../../domain/product/repository/product-repository';
import { Product } from '../../../../domain/product/entity/product';
import { ProductModel } from './product-model';

export class DatabaseProductRepository implements ProductRepository {
  async create(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }

  async update(product: Product): Promise<void> {
    await ProductModel.update(
      {
        name: product.name,
        price: product.price,
      },
      { where: { id: product.id } }
    );
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });
    return new Product(
      productModel?.id as UUID,
      productModel?.name as string,
      productModel?.price as number
    );
  }

  async findAll(): Promise<Product[]> {
    const foundProducts = await ProductModel.findAll();
    return foundProducts.map((product) => new Product(product.id, product.name, product.price));
  }
}
