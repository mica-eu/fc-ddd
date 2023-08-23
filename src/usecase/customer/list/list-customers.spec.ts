import { randomUUID } from 'crypto';
import { Customer } from '../../../domain/customer/entity/customer';
import { CustomerRepository } from '../../../domain/customer/repository/customer-repository';
import { Address } from '../../../domain/customer/value-object/address';
import { ListCustomerUseCase } from './list-customers';

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('uuid'),
}));

const makeCustomers = (): Customer[] => {
  const customers: Customer[] = [];
  for (let i = 0; i < 10; i++) {
    customers.push(
      new Customer(
        randomUUID(),
        `John Doe ${i}`,
        new Address(`Street ${i}`, `City ${i}`, `Number ${i}`, `ZipCode ${i}`, '')
      )
    );
  }
  return customers;
};

const makeCustomerRepositoryStub = (mock: Customer[]): CustomerRepository => ({
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn().mockResolvedValue(mock),
});

describe('ListCustomerUseCase', () => {
  it('should list customers', async () => {
    const customersMock = makeCustomers();
    const customerRepositoryStub = makeCustomerRepositoryStub(customersMock);
    const sut = new ListCustomerUseCase(customerRepositoryStub);
    const inputDto = {};
    const outputDto = await sut.execute(inputDto);
    expect(outputDto).toEqual({
      customers: customersMock.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          city: customer.address.city,
          number: customer.address.number,
          zipCode: customer.address.zipCode,
          complement: customer.address.complement,
        },
      })),
    });
  });
});
