import { randomUUID } from 'crypto';
import { Customer } from '../../../domain/customer/entity/customer';
import { CustomerRepository } from '../../../domain/customer/repository/customer-repository';
import { Address } from '../../../domain/customer/value-object/address';
import { CreateCustomerUseCase } from './create-customer';

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('uuid'),
}));

const makeCustomer = (): Customer =>
  new Customer(randomUUID(), 'John Doe', new Address('Street', 'City', 'Number', 'ZipCode', ''));

const makeCustomerRepositoryStub = (): CustomerRepository => ({
  find: jest.fn().mockResolvedValue(makeCustomer()),
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
});

describe('CreateCustomerUseCase', () => {
  it('creates a customer', async () => {
    const customer = makeCustomer();
    const customerRepositoryStub = makeCustomerRepositoryStub();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepositoryStub);
    const customerDto = await createCustomerUseCase.execute({
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zipCode: customer.address.zipCode,
        complement: customer.address.complement,
      },
    });
    expect(customerDto).toEqual({
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
