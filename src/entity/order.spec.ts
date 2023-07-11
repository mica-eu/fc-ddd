import { randomUUID } from 'node:crypto';
import { Order } from './order';
import { OrderItem } from './order-item';

describe('Order', () => {
  it('throws error when id is empty', () => {
    expect(() => new Order('', randomUUID(), [])).toThrowError(
      'Missing required param <id>'
    );
  });

  it('throws error when customerId is empty', () => {
    expect(() => new Order(randomUUID(), '', [])).toThrowError(
      'Missing required param <customerId>'
    );
  });

  it('throws error when items quantity is equals or less than 0', () => {
    expect(() => new Order(randomUUID(), randomUUID(), [])).toThrowError(
      'Missing required param <items>'
    );
  });

  it('returns the order total value', () => {
    const items: OrderItem[] = [
      new OrderItem(randomUUID(), 'Produto 01', 2.0),
      new OrderItem(randomUUID(), 'Produto 02', 5.0),
    ];
    const order = new Order(randomUUID(), randomUUID(), items);
    expect(order.total()).toBe(7);
  });
});
