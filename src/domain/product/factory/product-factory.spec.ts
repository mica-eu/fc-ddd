import { ProductFactory } from './product-factory';

describe('ProductFactory', () => {
  it('creates a new product', () => {
    const product = ProductFactory.create('New Product', 25.0);
    expect(product.id).toBeDefined();
    expect(product.name).toBe('New Product');
    expect(product.price).toBe(25.0);
  });
});
