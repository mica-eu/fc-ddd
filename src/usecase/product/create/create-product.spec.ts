import { container } from 'tsyringe';
import { CreateProductUseCase } from './create-product';
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

function makeSUT(): CreateProductUseCase {
  return container
    .register('ProductRepository', ProductRepositoryStub)
    .resolve(CreateProductUseCase);
}

describe('CreateProductUseCase', () => {
  it('creates a product', async () => {
    const sut = makeSUT();
    const outputDto = await sut.execute({
      name: 'Product Name',
      price: 10,
    });
    expect(outputDto).toEqual({
      id: 'valid-uuid',
      name: 'Product Name',
      price: 10,
    });
  });

  it('calls the repository to save the product', async () => {
    const repositoryCreateSpy = jest.spyOn(ProductRepositoryStub.prototype, 'create');
    const repositoryFindSpy = jest.spyOn(ProductRepositoryStub.prototype, 'find');
    const sut = makeSUT();
    await sut.execute({
      name: 'Product Name',
      price: 10,
    });
    expect(repositoryCreateSpy).toBeCalledTimes(1);
    expect(repositoryFindSpy).toBeCalledTimes(1);
  });
});
