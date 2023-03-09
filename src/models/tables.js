import BaseModel from './base';

export default class Tables extends BaseModel {
  static load(sequelize, DataTypes) {
    return super.init({
      code: DataTypes.STRING,
      is_crowded: DataTypes.BOOLEAN
    }, {
      timestamps: true,
      sequelize: sequelize,
      modelName: 'table',
      tableName: 'tables',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true
    });
  }

  static associate(models) {
    this.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
  }
}
