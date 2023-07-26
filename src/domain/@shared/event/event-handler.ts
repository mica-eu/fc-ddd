import { DomainEvent } from './event';

export interface EventHandler<T extends DomainEvent = DomainEvent> {
  execute(event: T): void;
}
