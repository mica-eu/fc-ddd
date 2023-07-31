import { UUID } from 'node:crypto';

export interface IProduct {
  get id(): UUID;
  get name(): string;
  get price(): number;
  changeName(name: string): void;
  changePrice(price: number): void;
}
