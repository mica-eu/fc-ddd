import { Customer } from '../../../domain/customer/entity/customer';
import { CustomerRepository } from '../../../domain/customer/repository/customer-repository';
import { Address } from '../../../domain/customer/value-object/address';
import { CreateCustomerUseCase } from './create-customer';
import { container } from 'tsyringe';

const customerMock = new Customer(
  'valid-uuid',
  'John Doe',
  new Address('Street', 'City', 'Number', 'ZipCode', '')
);

class CustomerRepositoryStub implements CustomerRepository {
  async find(): Promise<Customer> {
    return customerMock;
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

function makeSUT(): CreateCustomerUseCase {
  const sut = container
    .register<CustomerRepository>('CustomerRepository', CustomerRepositoryStub)
    .resolve(CreateCustomerUseCase);
  return sut;
}

describe('CreateCustomerUseCase', () => {
  it('creates a customer', async () => {
    const sut = makeSUT();
    const outputDto = await sut.execute({
      name: customerMock.name,
      address: {
        street: customerMock.address.street,
        city: customerMock.address.city,
        number: customerMock.address.number,
        zipCode: customerMock.address.zipCode,
        complement: customerMock.address.complement,
      },
    });
    expect(outputDto).toEqual({
      id: customerMock.id,
      name: customerMock.name,
      address: {
        street: customerMock.address.street,
        city: customerMock.address.city,
        number: customerMock.address.number,
        zipCode: customerMock.address.zipCode,
        complement: customerMock.address.complement,
      },
    });
  });
});
