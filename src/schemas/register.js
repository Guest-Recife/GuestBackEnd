import {
  object,
  number,
  string
} from 'yup';

const schemas = {
  create: {
    params: object().shape({
      restaurant_id: number().min(1).required()
    }).noUnknown(),
    body: object().shape({
      code: string().required()
    }).noUnknown()
  },
  find: {
    params: object().shape({
      id: number().min(1).required()
    }).noUnknown()
  }
};

export default {
  create: object(schemas.create),
  close: object(schemas.find)
};
