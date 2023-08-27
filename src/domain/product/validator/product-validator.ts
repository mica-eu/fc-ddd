import * as yup from 'yup';
import { Validator } from '../../@shared/validator/validator';
import { Product } from '../entity/product';

export class ProductValidator implements Validator<Product> {
  validate(product: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required(),
          name: yup.string().required(),
          price: yup.number().min(0).required(),
        })
        .validateSync(product, { abortEarly: false });
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((message) => {
        product.notification.addError('product', message);
      });
    }
  }
}
