import BaseModel from './base';

export default class RestaurantModel extends BaseModel {
  static load(sequelize, DataTypes) {
    return super.init({
      name: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      is_delivery: DataTypes.BOOLEAN,
      cep: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      address: DataTypes.STRING,
      number: DataTypes.INTEGER,
    }, {
      timestamps: true,
      sequelize: sequelize,
      modelName: 'restaurant',
      tableName: 'restaurants',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true
    });
  }
}
