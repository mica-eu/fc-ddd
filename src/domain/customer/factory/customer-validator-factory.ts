import { Validator } from '../../@shared/validator/validator';
import { Customer } from '../entity/customer';
import { CustomerValidator } from '../validator/customer-validator';

export class CustomerValidatorFactory {
  static create(): Validator<Customer> {
    return new CustomerValidator();
  }
}
