export default class Base {
  constructor(model) {
    if (model === undefined) {
      throw new TypeError('Model cannot be empty');
    }

    this.model = model;
  }

  getModel() {
    return this.model;
  }

  async exists(options) {
    const item = this.findOne(options);

    return !!item;
  }

  count(options) {
    return this.model.count(options);
  }

  findAll(options) {
    return this.model.findAll({
      raw: true,
      ...options,
    });
  }

  findOne(options) {
    return this.model.findOne({
      raw: true,
      ...options
    });
  }

  create(data, options) {
    return this.model.create(data, options);
  }

  bulkCreate(data, options) {
    return this.model.bulkCreate(data, options);
  }

  update(options, changes) {
    return this.model.update(changes, options);
  }

  destroy(options) {
    return this.model.destroy({
      ...options,
      force: true
    });
  }

  delete(options) {
    return this.model.destroy(options);
  }
}
