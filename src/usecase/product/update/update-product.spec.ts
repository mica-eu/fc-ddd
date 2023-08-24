import { container } from 'tsyringe';
import { ProductRepository } from '../../../domain/product/repository/product-repository';
import { Product } from '../../../domain/product/entity/product';
import { UpdateProductUseCase } from './update-product';

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('valid-uuid'),
}));

class ProductRepositoryStub implements ProductRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(product: Product): Promise<void> {
    return Promise.resolve();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(product: Product): Promise<void> {
    return Promise.resolve();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  find(id: string): Promise<Product> {
    return Promise.resolve(new Product(id, 'Product Name', 10));
  }
  findAll(): Promise<Product[]> {
    return Promise.resolve([new Product('valid-uuid', 'Product Name', 10)]);
  }
}

function makeSUT(): UpdateProductUseCase {
  return container
    .register('ProductRepository', ProductRepositoryStub)
    .resolve(UpdateProductUseCase);
}

describe('UpdateProductUseCase', () => {
  it('updates a product', async () => {
    const sut = makeSUT();
    const product = await sut.execute({
      id: 'any_id',
      name: 'any_name',
      price: 10,
    });
    expect(product).toEqual({
      id: 'any_id',
      name: 'any_name',
      price: 10,
    });
  });

  it('calls repository with correct params', async () => {
    const repositorySpy = jest.spyOn(ProductRepositoryStub.prototype, 'update');
    const sut = makeSUT();
    const outputDto = await sut.execute({
      id: 'any_id',
      name: 'Any other product name',
      price: 100,
    });
    expect(outputDto).toEqual({
      id: 'any_id',
      name: 'Any other product name',
      price: 100,
    });
    expect(repositorySpy).toBeCalledTimes(1);
  });
});
