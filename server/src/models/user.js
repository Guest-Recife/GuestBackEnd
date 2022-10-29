import BaseModel from './base';

export default class UserModel extends BaseModel  {
  static load(sequelize, DataTypes) {
    return super.init({
      name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      email: DataTypes.CITEXT,
      gender: DataTypes.STRING,
      cpf: DataTypes.STRING,
      phone: DataTypes.STRING
    }, {
      timestamps: true,
      sequelize: sequelize,
      modelName: 'user',
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }
}
