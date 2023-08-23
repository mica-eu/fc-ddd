import { Repository } from '../../@shared/repository/repository';
import { Customer } from '../entity/customer';

export interface CustomerRepository extends Repository<Customer> {
  create(customer: Customer): Promise<void>;
  update(customer: Customer): Promise<void>;
  find(id: string): Promise<Customer>;
  findAll(limit?: number, offset?: number): Promise<Customer[]>;
}
