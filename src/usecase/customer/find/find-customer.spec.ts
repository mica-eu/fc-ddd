import { Customer } from '../../../domain/customer/entity/customer';
import { randomUUID } from 'crypto';
import { Address } from '../../../domain/customer/value-object/address';
import { FindCustomerUseCase } from './find-customer';
import { CustomerRepository } from '../../../domain/customer/repository/customer-repository';
import { container } from 'tsyringe';

class CustomerRepositoryStub implements CustomerRepository {
  async find(): Promise<Customer> {
    return new Customer(
      'valid-uuid',
      'John Doe',
      new Address('Street', 'City', 'Number', 'ZipCode', '')
    );
  }

  async create(): Promise<void> {
    return;
  }

  async update(): Promise<void> {
    return;
  }

  async findAll(): Promise<Customer[]> {
    return [];
  }
}

function makeSUT(): { sut: FindCustomerUseCase; repositoryStub: CustomerRepositoryStub } {
  const sut = container
    .register<CustomerRepository>('CustomerRepository', CustomerRepositoryStub)
    .resolve(FindCustomerUseCase);
  return { sut, repositoryStub: new CustomerRepositoryStub() };
}

describe('FindCustomerUseCase', () => {
  it('throws an error if customer not found', async () => {
    jest.spyOn(CustomerRepositoryStub.prototype, 'find').mockImplementationOnce(() => {
      throw new Error('Customer not found');
    });
    const { sut } = makeSUT();
    expect(() => sut.execute({ id: randomUUID() })).rejects.toThrow('Customer not found');
  });

  it('finds a customer', async () => {
    const { sut, repositoryStub } = makeSUT();
    const customer = await repositoryStub.find();
    const customerFound = await sut.execute({ id: customer.id });
    expect(customerFound).toEqual({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zipCode: customer.address.zipCode,
        complement: customer.address.complement,
      },
    });
  });
});
