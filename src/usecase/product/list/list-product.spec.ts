import { container } from 'tsyringe';
import { ProductRepository } from '../../../domain/product/repository/product-repository';
import { Product } from '../../../domain/product/entity/product';
import { ListProductUseCase } from './list-product';

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

function makeSUT(): ListProductUseCase {
  return container.register('ProductRepository', ProductRepositoryStub).resolve(ListProductUseCase);
}

describe('ListProductUseCase', () => {
  it('lists all products', async () => {
    const sut = makeSUT();
    const product = await sut.execute({});
    expect(product).toEqual({
      products: [
        {
          id: 'valid-uuid',
          name: 'Product Name',
          price: 10,
        },
      ],
    });
  });
});
