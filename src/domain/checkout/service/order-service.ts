import { randomUUID } from 'crypto';
import { Order } from '../entity/order';
import { OrderItem } from '../entity/order-item';
import { Customer } from '../../customer/entity/customer';

export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    const order = new Order(randomUUID(), customer.id, items);
    customer.addRewardPoints(Math.round(order.total() / 2));
    return order;
  }
}
