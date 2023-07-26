import { randomUUID } from 'crypto';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../../../customer/repository/sequelize/customer-model';
import { OrderItemModel } from './order-item-model';
import { ProductModel } from '../../../product/repository/sequelize/product-model';
import { Address } from '../../../../domain/customer/value-object/address';
import { OrderItem } from '../../../../domain/checkout/entity/order-item';
import { OrderService } from '../../../../domain/checkout/service/order-service';
import { Order } from '../../../../domain/checkout/entity/order';
import { DatabaseOrderRepository } from './database-order-repository';
import { Customer } from '../../../../domain/customer/entity/customer';
import { Product } from '../../../../domain/product/entity/product';
import { DatabaseProductRepository } from '../../../product/repository/sequelize/database-product-repository';
import { DatabaseCustomerRepository } from '../../../customer/repository/sequelize/database-customer-repository';
import { OrderModel } from './order-model';

interface SUTOutput {
  productRepository: DatabaseProductRepository;
  orderRepository: DatabaseOrderRepository;
  orderItem: OrderItem;
  order: Order;
}

const makeSUT = async (): Promise<SUTOutput> => {
  const customerRepository = new DatabaseCustomerRepository();
  const productRepository = new DatabaseProductRepository();
  const orderRepository = new DatabaseOrderRepository();
  const address = new Address('5855566', 'City Name', 'Street Name', '100', 'Apto 101');
  const customer = new Customer(randomUUID(), 'John Doe', address);
  const product = new Product(randomUUID(), 'Product Name', 25.0);
  const orderItem = new OrderItem(randomUUID(), product.id, product.name, product.price, 1);
  await customerRepository.create(customer);
  await productRepository.create(product);
  const order = OrderService.placeOrder(customer, [orderItem]);
  return {
    productRepository,
    orderRepository,
    orderItem,
    order,
  };
};

describe('OrderRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('creates a new order', async () => {
    const { orderRepository, orderItem, order } = await makeSUT();
    await orderRepository.create(order);
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [OrderItemModel],
    });
    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          productId: orderItem.productId,
          orderId: order.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
        },
      ],
    });
  });

  it('updates a order', async () => {
    const { productRepository, orderRepository, order } = await makeSUT();
    await orderRepository.create(order);
    order.items.forEach((item) => order.removeItem(item.id));
    const product = new Product(randomUUID(), 'Product Name', 45.0);
    await productRepository.create(product);
    const orderItem = new OrderItem(randomUUID(), product.id, product.name, product.price, 1);
    order.addItem(orderItem);
    await orderRepository.update(order);
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [OrderItemModel],
    });
    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          productId: orderItem.productId,
          orderId: order.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
        },
      ],
    });
  });

  it('throws error order do not exists when try to update', async () => {
    const { orderRepository, order } = await makeSUT();
    expect(() => orderRepository.update(order)).rejects.toThrowError('Order not found!');
  });

  it('finds a order', async () => {
    const { orderRepository, order } = await makeSUT();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);
    expect(order).toEqual(foundOrder);
  });

  it('finds many orders', async () => {
    const { orderRepository, order } = await makeSUT();
    await orderRepository.create(order);

    const foundOrders = await orderRepository.findAll();
    expect([order]).toEqual(foundOrders);
  });
});
