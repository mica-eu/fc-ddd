import { randomUUID } from 'crypto';
import { Product } from '../entity/product';
import { ProductService } from './product-service';

describe('ProductService', () => {
  it('increases price of a product list', () => {
    const INCREASE_PERCENT = 18; // 18%
    const products = ProductService.increasePrice(
      [
        new Product(randomUUID(), 'Product 01', 55.8),
        new Product(randomUUID(), 'Product 02', 60),
        new Product(randomUUID(), 'Product 03', 99.99),
      ],
      INCREASE_PERCENT
    );
    const expectedIncreasedPrices = [65.844, 70.8, 117.98819999999999];
    expectedIncreasedPrices.forEach((increasedPrice, i) =>
      expect(products[i].price).toBe(increasedPrice)
    );
  });
});
