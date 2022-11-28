import BaseService from './base';
import RestaurantRepository from '../repositories/restaurant';

export default class Restaurant extends BaseService {
  constructor() {
    super();

    this.restaurantRespository = new RestaurantRepository();
  }

  find(id) {
    return this.restaurantRespository.findOne({
      where: {
        id
      },
      attributes: ['name', 'cnpj', 'is_delivery', 'cep', 'state', 'city', 'district', 'address', 'number']
    });
  }

  update(id, changes) {
    return this.restaurantRespository.update({
      where: { id }
    }, changes)
  }
}
