import {
  object,
  string,
  number,
  date
} from 'yup';

const schemas = {
  login: {
    body: object().shape({
      login: string().required(),
      password: string().required()
    }).noUnknown()
  }, register: {
    body: object().shape({
      name: string().min(1).max(99).required(),
      last_name: string().min(1).max(99).required(),
      birth_date: date().required(),
      gender: string().required().oneOf(['masculino', 'feminino', 'outro']),
      cpf: number().min(1),
      phone: number().min(1).required(),
      email: string().email().required(),
      password: string().required()
    }).noUnknown()
  }
};

export default {
  login: object(schemas.login),
  register: object(schemas.register)
};
