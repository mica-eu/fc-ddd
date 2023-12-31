import { Op } from 'sequelize';
import { OrderRepository } from '../../../../domain/checkout/repository/order-repository';
import { Order } from '../../../../domain/checkout/entity/order';
import { OrderModel } from './order-model';
import { OrderItemModel } from './order-item-model';
import { OrderItem } from '../../../../domain/checkout/entity/order-item';

export class DatabaseOrderRepository implements OrderRepository {
  async create(order: Order): Promise<void> {
    await OrderModel.create(
      {
        id: order.id,
        customerId: order.customerId,
        total: order.total(),
        items: order.items.map((item) => ({
          id: item.id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      { include: [OrderItemModel] }
    );
  }

  async update(order: Order): Promise<void> {
    let orderModel: OrderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id: order.id },
        rejectOnEmpty: true,
      });
    } catch {
      throw new Error('Order not found!');
    }
    await orderModel.update(
      {
        customerId: order.customerId,
        total: order.total(),
      },
      { where: { id: order.id } }
    );
    await OrderItemModel.destroy({
      where: {
        orderId: order.id,
        id: { [Op.notIn]: order.items.map((item) => item.id) },
      },
    });
    for (const item of order.items) {
      await OrderItemModel.findOrCreate({
        where: { id: item.id },
        defaults: {
          id: item.id,
          orderId: order.id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        },
      });
    }
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [OrderItemModel],
    });
    return new Order(
      orderModel?.id as string,
      orderModel?.customerId as string,
      orderModel?.items.map(
        (item) => new OrderItem(item.id, item.productId, item.name, item.price, item.quantity)
      ) as OrderItem[]
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [OrderItemModel],
    });
    return orderModels.map(
      (order) =>
        new Order(
          order?.id,
          order?.customerId,
          order?.items.map(
            (item) => new OrderItem(item.id, item.productId, item.name, item.price, item.quantity)
          )
        )
    );
  }
}
