import { container } from 'tsyringe';
import { FindProductUseCase } from './find-product';
import { ProductRepository } from '../../../domain/product/repository/product-repository';
import { Product } from '../../../domain/product/entity/product';

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
    return Promise.resolve(new Product('valid-uuid', 'Product Name', 10));
  }
  findAll(): Promise<Product[]> {
    return Promise.resolve([new Product('valid-uuid', 'Product Name', 10)]);
  }
}

function makeSUT(): FindProductUseCase {
  return container.register('ProductRepository', ProductRepositoryStub).resolve(FindProductUseCase);
}

describe('FindProductUseCase', () => {
  it('finds a product by id', async () => {
    const sut = makeSUT();
    const product = await sut.execute({ id: '1' });
    expect(product).toEqual({
      id: 'valid-uuid',
      name: 'Product Name',
      price: 10,
    });
  });

  it('calls repository with correct id', async () => {
    const repositorySpy = jest.spyOn(ProductRepositoryStub.prototype, 'find');
    const sut = makeSUT();
    await sut.execute({ id: 'some-uuid' });
    expect(repositorySpy).toHaveBeenCalledWith('some-uuid');
  });
});
