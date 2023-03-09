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

  findAll(options) {
    return this.model.findAll({
      ...options,
      raw: true
    });
  }

  findOne(options) {
    return this.model.findOne({
      ...options,
      raw: true
    });
  }

  create(data, options) {
    return this.model.create(data, options);
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
