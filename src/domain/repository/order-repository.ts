import { Order } from '../entity/order';
import { Repository } from './repository';

export interface OrderRepository extends Repository<Order> {
  create(order: Order): Promise<void>;
  update(order: Order): Promise<void>;
  find(id: string): Promise<Order>;
  findAll(): Promise<Order[]>;
}
