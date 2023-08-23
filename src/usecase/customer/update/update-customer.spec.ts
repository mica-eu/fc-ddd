import { randomUUID } from 'crypto';
import { Customer } from '../../../domain/customer/entity/customer';
import { CustomerRepository } from '../../../domain/customer/repository/customer-repository';
import { Address } from '../../../domain/customer/value-object/address';
import { UpdateCustomerUseCase } from './update-customer';
import { container } from 'tsyringe';

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('uuid'),
}));

const makeCustomer = (): Customer =>
  new Customer(randomUUID(), 'John Doe', new Address('Street', 'City', 'Number', 'ZipCode', ''));

class CustomerRepositoryStub implements CustomerRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(id: string): Promise<Customer> {
    return makeCustomer();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(customer: Customer): Promise<void> {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(customer: Customer): Promise<void> {
    return;
  }
  async findAll(): Promise<Customer[]> {
    return [];
  }
}

function makeSUT(): UpdateCustomerUseCase {
  return container
    .register<CustomerRepository>('CustomerRepository', CustomerRepositoryStub)
    .resolve(UpdateCustomerUseCase);
}

describe('UpdateCustomerUseCase', () => {
  it('should update a customer', async () => {
    const sut = makeSUT();
    const inputDto = {
      id: 'uuid',
      name: 'John Doe',
      address: {
        street: 'Street',
        city: 'City',
        number: 'Number',
        zipCode: 'ZipCode',
        complement: '',
      },
    };
    const outputDto = await sut.execute(inputDto);
    expect(outputDto).toEqual(inputDto);
  });
});
