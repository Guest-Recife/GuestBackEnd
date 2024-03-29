import FoodCategoryServices from '../services/food-category';
import BaseController from './base';

export default class FoodCategory extends BaseController {
  constructor() {
    super();

    this.foodCategoryServices = new FoodCategoryServices();

    this.list = this.list.bind(this);
    this.update = this.update.bind(this);
  }

  async create(req, res) {
    try {
      await this.foodCategoryServices.create(req.data);

      this.handleSuccess(res, req.data);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async list(req, res) {
    try {
      const foodCategories = await this.foodCategoryServices.list(req.filter.id);

      this.handleSuccess(res, foodCategories);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req, res) {
    try {
      await this.foodCategoryServices.update(req.filter.id, req.data);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
