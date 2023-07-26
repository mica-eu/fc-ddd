import { DomainEvent } from '../../@shared/event/event';

export class ProductCreatedEvent implements DomainEvent {
  readonly name = 'PRODUCT_CREATED';
  readonly createdAt: Date;
  readonly data: unknown;

  constructor(data: unknown) {
    this.createdAt = new Date();
    this.data = data;
  }
}
