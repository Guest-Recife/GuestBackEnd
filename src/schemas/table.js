import {
  object,
  number,
} from 'yup';

const schemas = {
  create: {
    body: object().shape({
      number: number().required()
    }).noUnknown()
  },
  list: {
    params: object().shape({
      id: number().required().min(1)
    }).noUnknown()
  },
  update: {
    params: object().shape({
      id: number().required().min(1)
    }).noUnknown(),
    body: object().shape({
      number: number(),
      is_crowded: number().required()
    }).noUnknown()
  }
};

export default {
  create: object(schemas.create),
  list: object(schemas.list),
  find: object(schemas.list),
  update: object(schemas.update)
};
