import { DomainEvent } from './event';
import { EventHandler } from './event-handler';

interface DispatcherEventHandlers {
  [key: string]: EventHandler[];
}

export interface EventDispatcher<T extends DomainEvent = DomainEvent> {
  notify(event: T): void;
  register(eventName: string, eventHandler: EventHandler): void;
  unregister(eventName: string, eventHandler: EventHandler): void;
  unregisterAll(): void;
}

export class DefaultEventDispatcher implements EventDispatcher {
  #eventHandlers: DispatcherEventHandlers = {};

  get eventHandlers(): DispatcherEventHandlers {
    return this.#eventHandlers;
  }

  notify(event: DomainEvent): void {
    if (this.#eventHandlers[event.name]) {
      this.#eventHandlers[event.name].forEach((handler) => {
        handler.execute(event);
      });
    }
  }

  register(eventName: string, eventHandler: EventHandler): void {
    if (!this.#eventHandlers[eventName]) {
      this.#eventHandlers[eventName] = [];
    }
    this.#eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandler): void {
    if (this.#eventHandlers[eventName]) {
      this.#eventHandlers[eventName] = this.#eventHandlers[eventName].filter(
        (handler) => !Object.is(eventHandler, handler)
      );
    }
  }

  unregisterAll(): void {
    this.#eventHandlers = {};
  }
}
