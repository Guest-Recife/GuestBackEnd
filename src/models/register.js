import BaseModel from './base';

export default class Register extends BaseModel {
  static load(sequelize, DataTypes) {
    return super.init({
      check_in: DataTypes.DATE,
      check_out: DataTypes.DATE,
      paid_date: DataTypes.DATE,
      total_price: DataTypes.DOUBLE,
      payment_method: DataTypes.STRING
    }, {
      timestamps: true,
      sequelize: sequelize,
      modelName: 'register',
      tableName: 'registers',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true
    });
  }

  static associate(models) {
    this.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Table, { foreignKey: 'table_id' });
  }
}
