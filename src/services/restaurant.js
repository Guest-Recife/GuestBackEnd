import BaseService from './base';
import RestaurantRepository from '../repositories/restaurant';

export default class Restaurant extends BaseService {
  constructor() {
    super();

    this.restaurantRespository = new RestaurantRepository();
  }

  index() {
    return this.restaurantRespository.findAll();
  }

  async find(id) {
    const restaurant = await this.restaurantRespository.findOne({
      where: {
        id
      },
      attributes: ['name', 'cnpj', 'is_delivery', 'cep', 'state', 'city', 'district', 'address', 'number']
    });

    if (!restaurant) throw this.handleException({ error: 'NOT_FOUND', code: 400 });

    return restaurant;
  }

  update(id, changes) {
    return this.restaurantRespository.update({
      where: { id }
    }, changes);
  }
}
