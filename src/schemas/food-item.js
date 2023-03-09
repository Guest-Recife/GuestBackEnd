import {
  object,
  string,
  number
} from 'yup';

const schemas = {
  create: {
    body: object().shape({
      name: string().required().max(100),
      description: string().required().max(255),
      price: number().required()
    }).noUnknown()
  },
  list: {
    params: object().shape({
      restaurant_id: number().required().min(1)
    }).noUnknown()
  },
  update: {
    params: object().shape({
      id: number().required().min(1)
    }).noUnknown(),
    body: object().shape({
      name: string().required().max(100),
      description: string().required().max(255),
      price: number().required()
    }).noUnknown()
  }
};

export default {
  create: object(schemas.create),
  list: object(schemas.list),
  update: object(schemas.update)
};
