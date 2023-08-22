export class OrderItem {
  constructor(
    readonly id: string,
    readonly productId: string,
    readonly name: string,
    readonly price: number,
    readonly quantity: number
  ) {}

  total(): number {
    return this.price * this.quantity;
  }
}
