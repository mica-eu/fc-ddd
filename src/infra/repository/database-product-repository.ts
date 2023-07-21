import { UUID } from 'crypto';
import { Product } from '../../domain/entity/product';
import { ProductRepository } from '../../domain/repository/product-repository';
import { ProductModel } from '../db/sequelize/model/product-model';

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

  async find(id: UUID): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });
    return new Product(
      productModel?.id as UUID,
      productModel?.name as string,
      productModel?.price as number
    );
  }

  async findAll(): Promise<Product[]> {
    const foundProducts = await ProductModel.findAll();
    return foundProducts.map(
      (product) => new Product(product.id, product.name, product.price)
    );
  }
}
