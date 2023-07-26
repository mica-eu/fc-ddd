import { DomainEvent } from './event';
import { EventHandler } from './event-handler';

interface DispacherEventHandlers {
  [key: string]: EventHandler[];
}

export interface EventDispatcher<T extends DomainEvent = DomainEvent> {
  notify(event: T): void;
  register(eventName: string, eventHandler: EventHandler): void;
  unregister(eventName: string, eventHandler: EventHandler): void;
  unregisterAll(): void;
}

export class DefaultEventDispatcher implements EventDispatcher {
  #eventHanders: DispacherEventHandlers = {};

  get eventHandlers(): DispacherEventHandlers {
    return this.#eventHanders;
  }

  notify(event: DomainEvent): void {
    if (this.#eventHanders[event.name]) {
      this.#eventHanders[event.name].forEach((handler) => {
        handler.execute(event);
      });
    }
  }

  register(eventName: string, eventHandler: EventHandler): void {
    if (!this.#eventHanders[eventName]) {
      this.#eventHanders[eventName] = [];
    }
    this.#eventHanders[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandler): void {
    if (this.#eventHanders[eventName]) {
      this.#eventHanders[eventName] = this.#eventHanders[eventName].filter(
        (handler) => !Object.is(eventHandler, handler)
      );
    }
  }

  unregisterAll(): void {
    this.#eventHanders = {};
  }
}
