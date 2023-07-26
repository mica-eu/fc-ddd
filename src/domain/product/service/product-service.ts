import { Product } from '../entity/product';

export class ProductService {
  static increasePrice(products: Product[], percent: number): Product[] {
    return products.map((product) => {
      const increasedPrice = product.price + (product.price * percent) / 100;
      product.changePrice(increasedPrice);
      return product;
    });
  }
}
