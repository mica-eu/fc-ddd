import { UUID } from 'node:crypto';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CustomerModel } from './customer-model';
import { OrderItemModel } from './order-item-model';

@Table({
  tableName: 'orders',
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: UUID;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customerId: UUID;

  @Column({ allowNull: false })
  declare total: number;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];
}
