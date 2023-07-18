export class Address {
  constructor(
    readonly zipcode: string,
    readonly city: string,
    readonly street: string,
    readonly number: string,
    readonly complement: string
  ) {}
}
