import { UUID } from 'crypto';
import type { OrderItem } from './order-item';

export class Order {
  #id: UUID;
  #customerId: UUID;
  #items: OrderItem[];
  constructor(id: UUID, customerId: UUID, items: OrderItem[]) {
    this.#id = id;
    this.#customerId = customerId;
    this.#items = items;
    this.validate();
  }

  get id(): UUID {
    return this.#id;
  }

  get customerId(): UUID {
    return this.#customerId;
  }

  get items(): OrderItem[] {
    return this.#items;
  }

  addItem(item: OrderItem): void {
    this.#items.push(item);
  }

  removeItem(id: UUID): void {
    this.#items = this.items.filter((item) => item.id !== id);
  }

  private validate(): boolean {
    if (!this.#id) {
      throw new Error('Missing required param <id>');
    }
    if (!this.#customerId) {
      throw new Error('Missing required param <customerId>');
    }
    if (this.#items.length === 0) {
      throw new Error('Missing required param <items>');
    }
    return true;
  }

  total(): number {
    return this.items.reduce((acc, item) => acc + item.total(), 0);
  }
}
