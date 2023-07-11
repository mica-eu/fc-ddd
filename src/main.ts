import { randomUUID } from 'crypto';
import { Customer } from './entity/customer';
import { OrderItem } from './entity/order-item';
import { Order } from './entity/order';
import { Address } from './entity/address';

const address = new Address('Rua ABC', 100, 'Apto 01');
const customer = new Customer(randomUUID(), 'Jhon Doe', address);
const items: OrderItem[] = [
  new OrderItem(randomUUID(), '76788800c931', 'Produto 01', 2.0, 20),
  new OrderItem(randomUUID(), '76788800c931', 'Produto 02', 5.0, 10),
];
const order = new Order(randomUUID(), customer.id, items);
console.log(order, customer);
console.log(order.total());
