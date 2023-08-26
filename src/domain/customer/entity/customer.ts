import { Entity } from '../../@shared/entity/entity';
import type { Address } from '../value-object/address';

export class Customer extends Entity {
  #active: boolean;
  #name: string;
  #address: Address;
  #rewardPoints = 0;

  constructor(readonly id: string, name: string, address: Address) {
    super();
    this.#active = false;
    this.#name = name;
    this.#address = address;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new Error(this.notification.getMessage());
    }
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
    if (!this.id) {
      this.notification.addError('customer', 'id is required');
    }
    if (!this.#name) {
      this.notification.addError('customer', 'name is required');
    }
  }

  activate() {
    if (!this.#address) {
      throw new Error('customer: address is required');
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

  changeAddress(address: Address): void {
    this.#address = address;
    this.validate();
  }
}
