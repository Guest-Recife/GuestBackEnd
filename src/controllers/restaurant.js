import RestaurantServices from '../services/restaurant';
import BaseController from './base';

export default class Restaurant extends BaseController {
  constructor() {
    super();

    this.restaurantService = new RestaurantServices();
  }

  async find(req, res) {
    try {
      const restaurant = await this.restaurantService.find(req.filter.id);

      this.handleSuccess(res, restaurant);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  async update(req, res) {
    try {
      await this.restaurantService.update(req.filter.id, req.data);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  };
}
