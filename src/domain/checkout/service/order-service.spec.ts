import { randomUUID } from 'crypto';
import { OrderItem } from '../entity/order-item';
import { Order } from '../entity/order';
import { OrderService } from './order-service';
import { Address } from '../../customer/value-object/address';
import { Customer } from '../../customer/entity/customer';

describe('OrderService', () => {
  it('places a order', () => {
    const address = new Address('5855566', 'City Name', 'Street Name', '100', 'Apto 101');
    const customer = new Customer(randomUUID(), 'John Doe', address);
    const orderItem = new OrderItem(randomUUID(), randomUUID(), 'Product Name', 10, 1);
    const order = OrderService.placeOrder(customer, [orderItem]);
    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it('returns the total amount of all orders', () => {
    const items: OrderItem[] = [
      new OrderItem(randomUUID(), randomUUID(), 'Produto 01', 2, 2),
      new OrderItem(randomUUID(), randomUUID(), 'Produto 02', 5, 5),
    ];
    expect(
      OrderService.total([
        new Order(randomUUID(), randomUUID(), items),
        new Order(randomUUID(), randomUUID(), items),
      ])
    ).toBe(58);
  });
});
