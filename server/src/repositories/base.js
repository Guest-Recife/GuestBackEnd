export default class Base {
  constructor(model) {
    if (model === undefined) {
      throw new TypeError('Model cannot be empty');
    }

    this.model = model;
  }

  async exists(filter) {
    const item = this.findOne(filter);

    return !!item;
  }

  findAll(filter) {
    return this.model.findAll(filter);
  }

  findOne(filter) {
    return this.model.findOne(filter);
  }

  create(data, options) {
    return this.model.create(data, options);
  }

  update(filter, changes) {
    return this.model.update(filter, changes);
  }

  destroy(filter) {
    return this.model.destroy(filter);
  }

  delete(filter) {
    return this.model.update({ deleted_at: new Date() }, filter);
  }
}
