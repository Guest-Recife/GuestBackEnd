import BaseModel from './base';

export default class OrderItem extends BaseModel {
  static load(sequelize, DataTypes) {
    return super.init({
      quantity: DataTypes.INTEGER,
      unit_price: DataTypes.DOUBLE,
      has_arrived: DataTypes.BOOLEAN,
      is_deleted: DataTypes.BOOLEAN
    }, {
      timestamps: false,
      sequelize: sequelize,
      modelName: 'order_item',
      tableName: 'order_items',
      createdAt: 'created_at',
      paranoid: true
    });
  }
}
