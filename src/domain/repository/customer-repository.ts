import { Customer } from '../entity/customer';
import { Repository } from './repository';

export interface CustomerRepository extends Repository<Customer> {
  create(customer: Customer): Promise<void>;
  update(customer: Customer): Promise<void>;
  find(id: string): Promise<Customer>;
  findAll(): Promise<Customer[]>;
}
