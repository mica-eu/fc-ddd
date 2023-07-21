import { UUID } from 'crypto';

export class OrderItem {
  constructor(
    readonly id: UUID,
    readonly productId: UUID,
    readonly name: string,
    readonly price: number,
    readonly quantity: number
  ) {}

  total(): number {
    return this.price * this.quantity;
  }
}
