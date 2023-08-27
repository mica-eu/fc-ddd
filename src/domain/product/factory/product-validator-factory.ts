import { Validator } from '../../@shared/validator/validator';
import { Product } from '../entity/product';
import { ProductValidator } from '../validator/product-validator';

export class ProductValidatorFactory {
  static create(): Validator<Product> {
    return new ProductValidator();
  }
}
