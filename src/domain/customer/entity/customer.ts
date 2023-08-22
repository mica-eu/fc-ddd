import type { Address } from '../value-object/address';

export class Customer {
  #active: boolean;
  #id: string;
  #name: string;
  #address: Address;
  #rewardPoints = 0;

  constructor(id: string, name: string, address: Address) {
    this.#active = false;
    this.#id = id;
    this.#name = name;
    this.#address = address;
    this.validate();
  }

  get id(): string {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get address(): Address {
    return this.#address;
  }

  get rewardPoints(): number {
    return this.#rewardPoints;
  }

  addRewardPoints(points: number) {
    this.#rewardPoints += points;
  }

  validate() {
    if (!this.#id) {
      throw new Error('Missing required prop <id>');
    }
    if (!this.#name) {
      throw new Error('Missing required prop <name>');
    }
  }

  activate() {
    if (!this.#address) {
      throw new Error('Missing required prop <address>');
    }
    this.#active = true;
  }

  deactivate() {
    this.#active = false;
  }

  isActive() {
    return this.#active;
  }

  changeName(name: string): void {
    this.#name = name;
    this.validate();
  }
}
