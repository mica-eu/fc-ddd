import { Entity } from '../../@shared/entity/entity';
import { ProductValidatorFactory } from '../factory/product-validator-factory';

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
    ProductValidatorFactory.create().validate(this);
    if (this.notification.hasErrors()) {
      throw new Error(this.notification.getMessage());
    }
  }
}
