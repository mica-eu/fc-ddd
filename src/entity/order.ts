import { OrderItem } from './order-item';

export class Order {
  constructor(
    readonly id: string,
    readonly customerId: string,
    readonly items: OrderItem[]
  ) {}

  total(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
