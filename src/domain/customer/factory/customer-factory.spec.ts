import { CustomerFactory } from './customer-factory';

describe('CustomerFactory', () => {
  it('creates a new customer', () => {
    const customer = CustomerFactory.create('John', {
      street: 'Rua 123',
      city: 'Cidade',
      number: '123',
      complement: '',
      zipcode: '55555-55',
    });
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.address).toEqual({
      street: 'Rua 123',
      city: 'Cidade',
      number: '123',
      complement: '',
      zipcode: '55555-55',
    });
  });
});
