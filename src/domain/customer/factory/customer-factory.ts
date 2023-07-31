import { randomUUID } from 'crypto';
import { Customer } from '../entity/customer';
import { Address } from '../value-object/address';

export class CustomerFactory {
  static create(name: string, address: Address): Customer {
    return new Customer(randomUUID(), name, address);
  }
}
