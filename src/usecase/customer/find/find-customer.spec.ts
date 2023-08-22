import { Customer } from '../../../domain/customer/entity/customer';
import { randomUUID } from 'crypto';
import { Address } from '../../../domain/customer/value-object/address';
import { FindCustomerUseCase } from './find-customer';
import { CustomerRepository } from '../../../domain/customer/repository/customer-repository';

const makeCustomerRepositoryStub = (): CustomerRepository => ({
  find: jest
    .fn()
    .mockResolvedValue(
      new Customer(randomUUID(), 'John Doe', new Address('Street', 'City', 'Number', 'ZipCode', ''))
    ),
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
});

describe('FindCustomerUseCase', () => {
  it('throws an error if customer not found', async () => {
    const customerRepositoryStub = makeCustomerRepositoryStub();
    customerRepositoryStub.find = jest.fn().mockImplementationOnce(() => {
      throw new Error('Customer not found');
    });
    const findCustomerUseCase = new FindCustomerUseCase(customerRepositoryStub);
    expect(() => findCustomerUseCase.execute({ id: randomUUID() })).rejects.toThrow(
      'Customer not found'
    );
  });

  it('finds a customer', async () => {
    const customerRepositoryStub = makeCustomerRepositoryStub();
    const customer = await customerRepositoryStub.find('');
    const findCustomerUseCase = new FindCustomerUseCase(customerRepositoryStub);
    const customerFound = await findCustomerUseCase.execute({ id: customer.id });
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
