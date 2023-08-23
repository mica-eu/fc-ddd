import { randomUUID } from 'crypto';
import { Customer } from '../../../domain/customer/entity/customer';
import { CustomerRepository } from '../../../domain/customer/repository/customer-repository';
import { Address } from '../../../domain/customer/value-object/address';
import { UpdateCustomerUseCase } from './update-customer';

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

describe('UpdateCustomerUseCase', () => {
  it('should update a customer', async () => {
    const customerRepositoryStub = makeCustomerRepositoryStub();
    const sut = new UpdateCustomerUseCase(customerRepositoryStub);
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
