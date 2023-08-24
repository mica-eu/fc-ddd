import { container } from 'tsyringe';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseProductRepository } from '../../../infra/product/repository/sequelize/database-product-repository';
import { ProductModel } from '../../../infra/product/repository/sequelize/product-model';
import { Product } from '../../../domain/product/entity/product';
import { randomUUID } from 'crypto';
import { ListProductUseCase } from './list-product';

function makeSUT(): ListProductUseCase {
  return container
    .register('ProductRepository', DatabaseProductRepository)
    .resolve(ListProductUseCase);
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

  it('lists products', async () => {
    const productRepository = container.resolve(DatabaseProductRepository);
    const product = new Product(randomUUID(), 'Product Name', 55);
    await productRepository.create(product);
    const sut = makeSUT();
    const outputDto = await sut.execute({});
    expect(outputDto).toEqual({
      products: [
        {
          id: product.id,
          name: 'Product Name',
          price: 55,
        },
      ],
    });
  });
});
