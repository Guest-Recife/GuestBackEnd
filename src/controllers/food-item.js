import FoodItemServices from '../services/food-item';
import BaseController from './base';

export default class FoodItem extends BaseController {
  constructor() {
    super();

    this.foodItemServices = new FoodItemServices();

    this.list = this.list.bind(this);
    this.update = this.update.bind(this);
  }

  async create(req, res) {
    try {
      await this.foodItemServices.create(req.data);

      this.handleSuccess(res, req.data);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async list(req, res) {
    try {
      const foodItems = await this.foodItemServices.list(req.filter.id);

      this.handleSuccess(res, foodItems);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req, res) {
    try {
      await this.foodItemServices.update(req.filter.id, req.data);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
