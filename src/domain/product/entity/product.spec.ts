import { randomUUID } from 'crypto';
import { Product } from './product';

describe('Product', () => {
  it('throws error when id is empty', () => {
    // @ts-expect-error ...
    expect(() => new Product(null, 'Product Name', 2.3)).toThrowError(
      'product: id is a required field'
    );
  });

  it('throws error when name is empty', () => {
    expect(() => new Product(randomUUID(), '', 2.3)).toThrowError(
      'product: name is a required field'
    );
  });

  it('throws error when price is empty', () => {
    // @ts-expect-error ...
    expect(() => new Product(randomUUID(), 'Product Name')).toThrowError(
      'product: price is a required field'
    );
  });

  it('throws error when price is is less than 0', () => {
    expect(() => new Product(randomUUID(), 'Product Name', -1)).toThrowError(
      'product: price must be greater than or equal to 0'
    );
  });

  it('changes product name', () => {
    const product = new Product(randomUUID(), 'Product Name', 100);
    product.changeName('Other Product Name');
    expect(product.name).toBe('Other Product Name');
  });

  it('changes product price', () => {
    const product = new Product(randomUUID(), 'Product Name', 100);
    product.changePrice(1500);
    expect(product.price).toBe(1500);
  });

  it('throws error if price to change is less than 0', () => {
    const product = new Product(randomUUID(), 'Product Name', 100);
    expect(() => product.changePrice(-1500)).toThrowError(
      'product: price must be greater than or equal to 0'
    );
  });

  it('throws error with more than one error', () => {
    expect(() => new Product(randomUUID(), '', -1)).toThrowError(
      'product: name is a required field, price must be greater than or equal to 0'
    );
  });
});
