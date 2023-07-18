import { UUID } from 'node:crypto';
import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column
  declare id: UUID;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}
