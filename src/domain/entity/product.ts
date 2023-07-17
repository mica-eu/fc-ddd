export class Product {
  #id: string;
  #name: string;
  #price: number;

  constructor(id: string, name: string, price: number) {
    this.#id = id;
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
    if (!this.#id.trim()) {
      throw new Error('Missing required param <id>');
    }
    if (!this.#name.trim()) {
      throw new Error('Missing required param <name>');
    }
    if (this.#price === undefined || this.#price === null) {
      throw new Error('Missing required param <price>');
    }
    if (this.#price < 0) {
      throw new Error('<price> param must be greater than 0');
    }
  }
}
