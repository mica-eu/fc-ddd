import { container } from 'tsyringe';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseProductRepository } from '../../../infra/product/repository/sequelize/database-product-repository';
import { ProductModel } from '../../../infra/product/repository/sequelize/product-model';
import { FindProductUseCase } from './find-product';
import { Product } from '../../../domain/product/entity/product';
import { randomUUID } from 'crypto';

function makeSUT(): FindProductUseCase {
  return container
    .register('ProductRepository', DatabaseProductRepository)
    .resolve(FindProductUseCase);
}

describe('CreateProductUseCase', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('finds a product', async () => {
    const productRepository = container.resolve(DatabaseProductRepository);
    const product = new Product(randomUUID(), 'Product Name', 55);
    await productRepository.create(product);
    const sut = makeSUT();
    const outputDto = await sut.execute({ id: product.id });
    expect(outputDto).toEqual({
      id: product.id,
      name: 'Product Name',
      price: 55,
    });
  });
});
