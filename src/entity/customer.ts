import { Address } from './address';

export class Customer {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly address: Address
  ) {}
}
