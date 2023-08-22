import { UUID } from 'crypto';
import type { OrderItem } from './order-item';

export class Order {
  #id: string;
  #customerId: string;
  #items: OrderItem[];
  constructor(id: string, customerId: string, items: OrderItem[]) {
    this.#id = id;
    this.#customerId = customerId;
    this.#items = items;
    this.validate();
  }

  get id(): string {
    return this.#id;
  }

  get customerId(): string {
    return this.#customerId;
  }

  get items(): OrderItem[] {
    return this.#items;
  }

  addItem(item: OrderItem): void {
    this.#items.push(item);
  }

  removeItem(id: string): void {
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
