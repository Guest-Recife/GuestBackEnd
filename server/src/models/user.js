import bcryptjs from 'bcryptjs';

import BaseModel from './base';

export default class UserModel extends BaseModel  {
  static load(sequelize, DataTypes) {
    return super.init({
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      last_name: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      email: DataTypes.CITEXT,
      gender: {
        type: DataTypes.STRING,
        values: ['masculino', 'feminino', 'outro']
      },
      cpf: DataTypes.STRING,
      phone: DataTypes.STRING
    }, {
      timestamps: true,
      sequelize: sequelize,
      modelName: 'user',
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: {
        beforeCreate: user => {
          return user.password = bcryptjs.hashSync(user.password, 8);
        }
      }
    });
  }
}
