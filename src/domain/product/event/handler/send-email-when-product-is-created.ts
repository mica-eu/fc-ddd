import { EventHandler } from '../../../@shared/event/event-handler';
import { ProductCreatedEvent } from '../product-created';

export class SendEmailWhenProductIsCreate implements EventHandler<ProductCreatedEvent> {
  execute(event: ProductCreatedEvent): void {
    console.log(event);
  }
}
