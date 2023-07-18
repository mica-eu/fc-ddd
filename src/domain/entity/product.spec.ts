import { randomUUID } from 'crypto';
import { Product } from './product';

describe('Product', () => {
  it('throws error when id is empty', () => {
    // @ts-expect-error ...
    expect(() => new Product(null, 'Product Name', 2.3)).toThrowError(
      'Missing required param <id>'
    );
  });

  it('throws error when name is empty', () => {
    expect(() => new Product(randomUUID(), '', 2.3)).toThrowError(
      'Missing required param <name>'
    );
  });

  it('throws error when price is empty', () => {
    // @ts-expect-error ...
    expect(() => new Product(randomUUID(), 'Product Name')).toThrowError(
      'Missing required param <price>'
    );
  });

  it('throws error when price is is less than 0', () => {
    expect(() => new Product(randomUUID(), 'Product Name', -1)).toThrowError(
      '<price> param must be greater than 0'
    );
  });

  it('changes product name', () => {
    const product = new Product(randomUUID(), 'Product Name', 100);
    product.changeName('Celular');
    expect(product.name).toBe('Celular');
  });

  it('changes product price', () => {
    const product = new Product(randomUUID(), 'Product Name', 100);
    product.changePrice(1500);
    expect(product.price).toBe(1500);
  });

  it('throws erro if price to change is less than 0', () => {
    const product = new Product(randomUUID(), 'Product Name', 100);
    expect(() => product.changePrice(-1500)).toThrowError(
      '<price> param must be greater than 0'
    );
  });
});
