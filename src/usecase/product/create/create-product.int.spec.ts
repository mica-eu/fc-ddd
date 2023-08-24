import { container } from 'tsyringe';
import { Sequelize } from 'sequelize-typescript';
import { CreateProductUseCase } from './create-product';
import { DatabaseProductRepository } from '../../../infra/product/repository/sequelize/database-product-repository';
import { ProductModel } from '../../../infra/product/repository/sequelize/product-model';

function makeSUT(): CreateProductUseCase {
  return container
    .register('ProductRepository', DatabaseProductRepository)
    .resolve(CreateProductUseCase);
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

  it('creates a product', async () => {
    const sut = makeSUT();
    const outputDto = await sut.execute({
      name: 'Product Name',
      price: 10,
    });
    expect(outputDto).toEqual({
      id: expect.any(String),
      name: 'Product Name',
      price: 10,
    });
  });
});
