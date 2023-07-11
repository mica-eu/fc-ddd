import type { OrderItem } from './order-item';

export class Order {
  constructor(
    private id: string,
    private customerId: string,
    private items: OrderItem[]
  ) {
    this.validate();
  }

  private validate(): boolean {
    if (!this.id.trim()) {
      throw new Error('Missing required param <id>');
    }
    if (!this.customerId.trim()) {
      throw new Error('Missing required param <customerId>');
    }
    if (this.items.length === 0) {
      throw new Error('Missing required param <items>');
    }
    return true;
  }

  total(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
