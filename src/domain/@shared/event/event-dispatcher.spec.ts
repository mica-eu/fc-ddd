import { randomUUID } from 'crypto';
import { DomainEvent } from './event';
import { DefaultEventDispatcher } from './event-dispatcher';
import { EventHandler } from './event-handler';

const EVENT_NAME = 'PRODUCT_CREATED';

class StubEvent implements DomainEvent {
  name: string = EVENT_NAME;
  createdAt: Date;
  data: unknown;

  constructor(data: unknown) {
    this.createdAt = new Date();
    this.data = data;
  }
}

class StubEventHandler implements EventHandler<StubEvent> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  execute(event: StubEvent): void {}
}

describe('EventDispatcher', () => {
  it('notifies all event handlers', () => {
    const eventDispatcher = new DefaultEventDispatcher();
    const eventHandlerSpy = jest.spyOn(StubEventHandler.prototype, 'execute');
    const eventHandler = new StubEventHandler();
    eventDispatcher.register(EVENT_NAME, eventHandler);
    const event = new StubEvent({
      productId: randomUUID(),
      name: 'Product Name',
      price: 3.0,
    });
    eventDispatcher.notify(event);
    expect(eventHandlerSpy).toBeCalledWith(event);
  });

  it('registers a new event handler', () => {
    const eventDispatcher = new DefaultEventDispatcher();
    const eventHandler = new StubEventHandler();
    eventDispatcher.register(EVENT_NAME, eventHandler);
    expect(eventDispatcher.eventHandlers[EVENT_NAME]).toBeDefined();
    expect(eventDispatcher.eventHandlers[EVENT_NAME].length).toBe(1);
    expect(eventDispatcher.eventHandlers[EVENT_NAME][0]).toEqual(eventHandler);
  });

  it('unregister an event handler', () => {
    const eventDispatcher = new DefaultEventDispatcher();
    const eventHandler = new StubEventHandler();
    eventDispatcher.register(EVENT_NAME, eventHandler);
    eventDispatcher.unregister(EVENT_NAME, eventHandler);
    expect(eventDispatcher.eventHandlers[EVENT_NAME]).toBeDefined();
    expect(eventDispatcher.eventHandlers[EVENT_NAME].length).toBe(0);
  });

  it('unregister all event handlers', () => {
    const eventDispatcher = new DefaultEventDispatcher();
    const eventHandler = new StubEventHandler();
    eventDispatcher.register(EVENT_NAME, eventHandler);
    eventDispatcher.unregisterAll();
    expect(eventDispatcher.eventHandlers).toEqual({});
  });
});
