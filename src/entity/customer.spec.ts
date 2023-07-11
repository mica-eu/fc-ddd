import { randomUUID } from 'node:crypto';
import { Address } from './address';
import { Customer } from './customer';

describe('Customer', () => {
  it('throws error when id is empty', () => {
    expect(() => new Customer('', 'John')).toThrowError(
      'Missing required prop <id>'
    );
  });

  it('throws error when name is empty', () => {
    expect(() => new Customer(randomUUID(), '')).toThrowError(
      'Missing required prop <name>'
    );
  });

  it('throws error when address is empty', () => {
    const customer = new Customer(randomUUID(), 'John');
    expect(() => customer.activate()).toThrowError(
      'Missing required prop <address>'
    );
  });

  it('changes customer name', () => {
    const customer = new Customer(randomUUID(), 'John');
    customer.changeName('Sarah');
    expect(customer.name).toBe('Sarah');
  });

  it('activates customer', () => {
    const address = new Address('Rua 2', 123, 'Final da rua');
    const customer = new Customer(randomUUID(), 'John', address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('deactivates customer', () => {
    const customer = new Customer(randomUUID(), 'John');
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });
});
