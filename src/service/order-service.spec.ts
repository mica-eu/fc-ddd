import { randomUUID } from 'crypto';
import { OrderItem } from '../entity/order-item';
import { Order } from '../entity/order';
import { OrderService } from './order-service';

describe('OrderService', () => {
  it('returns the total amount of all orders', () => {
    const items: OrderItem[] = [
      new OrderItem(randomUUID(), '82b70e189401', 'Produto 01', 2, 2),
      new OrderItem(randomUUID(), '7b46a11c1f5e', 'Produto 02', 5, 5),
    ];
    expect(
      OrderService.total([
        new Order(randomUUID(), randomUUID(), items),
        new Order(randomUUID(), randomUUID(), items),
      ])
    ).toBe(58);
  });
});
