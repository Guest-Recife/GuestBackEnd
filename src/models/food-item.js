import BaseModel from './base';

export default class FoodItem extends BaseModel {
  static load(sequelize, DataTypes) {
    return super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
    }, {
      timestamps: true,
      sequelize: sequelize,
      modelName: 'food_item',
      tableName: 'food_items',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true
    });
  }

  static associate(models) {
    this.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
    this.belongsTo(models.FoodCategory, { foreignKey: 'food_category_id' });
  }
}
