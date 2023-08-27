import * as yup from 'yup';
import { Validator } from '../../@shared/validator/validator';
import { Customer } from '../entity/customer';

export class CustomerValidator implements Validator<Customer> {
  validate(customer: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required(),
          name: yup.string().required(),
        })
        .validateSync(customer, { abortEarly: false });
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((message) => {
        customer.notification.addError('customer', message);
      });
    }
  }
}
