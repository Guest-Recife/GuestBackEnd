import BaseModel from './base';

export default class FoodCategory extends BaseModel {
  static load(sequelize, DataTypes) {
    return super.init({
      name: DataTypes.STRING,
    }, {
      timestamps: true,
      sequelize: sequelize,
      modelName: 'food_category',
      tableName: 'food_categories',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true
    });
  }

  static associate(models) {
    this.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
    this.hasMany(models.FoodItem, { foreignKey: 'food_category_id' });
  }
}
