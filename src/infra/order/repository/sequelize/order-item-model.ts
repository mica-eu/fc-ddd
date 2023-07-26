import { UUID } from 'node:crypto';
import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ProductModel } from '../../../product/repository/sequelize/product-model';
import { OrderModel } from './order-model';

@Table({
  tableName: 'order_items',
  timestamps: false,
})
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: UUID;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare productId: UUID;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare orderId: UUID;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;
}
