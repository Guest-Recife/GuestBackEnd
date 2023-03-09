import {
  object,
  number,
  string
} from 'yup';

const schemas = {
  create: {
    body: object().shape({
      code: string().required()
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
      code: string(),
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
