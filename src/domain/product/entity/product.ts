import { Entity } from '../../@shared/entity/entity';

export class Product extends Entity {
  #name: string;
  #price: number;

  constructor(readonly id: string, name: string, price: number) {
    super();
    this.#name = name;
    this.#price = price;
    this.validate();
  }

  get name(): string {
    return this.#name;
  }

  get price(): number {
    return this.#price;
  }

  changeName(name: string): void {
    this.#name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this.#price = price;
    this.validate();
  }

  private validate(): void {
    if (!this.id) {
      this.notification.addError('product', 'id is required');
    }
    if (!this.#name.trim()) {
      this.notification.addError('product', 'name is required');
    }
    if (this.#price === undefined || this.#price === null) {
      this.notification.addError('product', 'price is required');
    }
    if (this.#price < 0) {
      this.notification.addError('product', 'price must be greater than 0');
    }
    if (this.notification.hasErrors()) {
      throw new Error(this.notification.getMessage());
    }
  }
}
