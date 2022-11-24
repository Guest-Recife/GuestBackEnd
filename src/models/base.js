import { Model } from 'sequelize';

export default class BaseModel extends Model {
  static init() {
    this.instances = {};

    return super.init(...arguments);
  }
}
