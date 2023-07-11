import type { Address } from './address';

export class Customer {
  #active: boolean;
  #id: string;
  #name: string;
  #address?: Address;

  constructor(id: string, name: string, address?: Address) {
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

  validate() {
    if (!this.#id.trim()) {
      throw new Error('Missing required prop <id>');
    }
    if (!this.#name.trim()) {
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
