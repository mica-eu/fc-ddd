import { container } from 'tsyringe';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseProductRepository } from '../../../infra/product/repository/sequelize/database-product-repository';
import { ProductModel } from '../../../infra/product/repository/sequelize/product-model';
import { Product } from '../../../domain/product/entity/product';
import { randomUUID } from 'crypto';
import { UpdateProductUseCase } from './update-product';

function makeSUT(): UpdateProductUseCase {
  return container
    .register('ProductRepository', DatabaseProductRepository)
    .resolve(UpdateProductUseCase);
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

  it('updates a product', async () => {
    const productId = randomUUID();
    const productRepository = container.resolve(DatabaseProductRepository);
    await productRepository.create(new Product(productId, 'Product Name', 55));
    const sut = makeSUT();
    const outputDto = await sut.execute({
      id: productId,
      name: 'Other Product Name',
      price: 100,
    });
    const updatedProduct = await productRepository.find(productId);
    expect(outputDto).toEqual({
      id: updatedProduct.id,
      name: updatedProduct.name,
      price: updatedProduct.price,
    });
  });
});
