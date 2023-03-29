import {
  object,
  array,
  number
} from 'yup';

const schemas = {
  create: {
    params: object().shape({
      register_id: number().required().min(1)
    }).noUnknown(),
    body: object().shape({
      food_items: array(object().shape({
        id: number().required().min(1),
        quantity: number().required().min(1)
      })).required().test('MIN_LENGTH_1', value => value && value.length)
    }).noUnknown()
  },
  list: {
    params: object().shape({
      restaurant_id: number().required().min(1)
    }).noUnknown()
  },
  find: {
    params: object().shape({
      id: number().required().min(1)
    }).noUnknown()
  },
  update: {
    params: object().shape({
      id: number().required().min(1)
    }).noUnknown()
  },
  cancel: {
    params: object().shape({
      id: number().required().min(1)
    }).noUnknown(),
    body: object().shape({
      ids: array(
        number().required().min(1)
      ).required().test('minLength', value => value && value.length)
    }).noUnknown()
  }
};

export default {
  create: object(schemas.create),
  update: object(schemas.update),
  cancel: object(schemas.cancel)
};
