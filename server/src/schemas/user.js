import {
  object,
  string
} from 'yup';

const schemas = {
  login: {
    body: object().shape({
      email: string().email().required(),
      password: string().required()
    }).noUnknown()
  }
};

export default {
  login: object(schemas.login)
};
