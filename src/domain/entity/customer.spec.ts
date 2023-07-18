import { randomUUID } from 'node:crypto';
import { Address } from './address';
import { Customer } from './customer';

describe('Customer', () => {
  const address = new Address(
    '5855566',
    'City Name',
    'Street Name',
    '100',
    'Apto 101'
  );

  it('throws error when id is empty', () => {
    // @ts-expect-error ...
    expect(() => new Customer(null, 'John', address)).toThrowError(
      'Missing required prop <id>'
    );
  });

  it('throws error when name is empty', () => {
    // @ts-expect-error ...
    expect(() => new Customer(randomUUID(), null, address)).toThrowError(
      'Missing required prop <name>'
    );
  });

  it('throws error when address is empty', () => {
    // @ts-expect-error ...
    const customer = new Customer(randomUUID(), 'John');
    expect(() => customer.activate()).toThrowError(
      'Missing required prop <address>'
    );
  });

  it('changes customer name', () => {
    // @ts-expect-error ...
    const customer = new Customer(randomUUID(), 'John');
    customer.changeName('Sarah');
    expect(customer.name).toBe('Sarah');
  });

  it('activates customer', () => {
    const customer = new Customer(randomUUID(), 'John', address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('deactivates customer', () => {
    // @ts-expect-error ...
    const customer = new Customer(randomUUID(), 'John');
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });
});
