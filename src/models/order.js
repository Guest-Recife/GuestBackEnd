import BaseModel from './base';

export default class Order extends BaseModel {
  static load(sequelize, DataTypes) {
    return super.init({
      price: DataTypes.DOUBLE,
      done: DataTypes.BOOLEAN
    }, {
      timestamps: true,
      sequelize: sequelize,
      modelName: 'order',
      tableName: 'orders',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true
    });
  }

  static associate(models) {
    this.belongsTo(models.Register, { foreignKey: 'register_id' });
    this.belongsToMany(models.FoodItem, { through: models.OrderItem });
  }
}
