import {
  object,
  string,
  number,
  date
} from 'yup';

import YupUtils from '../utils/yup';

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
      cpf: string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(11, 'Must be exactly 11 digits')
        .max(11, 'Must be exactly 11 digits'),
      phone: string().required()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(11, 'Must be exactly 11 digits')
        .max(11, 'Must be exactly 11 digits'),
      email: string().email().required(),
      password: string().min(6).max(10).required()
    }).noUnknown()
  }, update: {
    body: object().shape({
      file_id: number().min(1),
      name: string().min(1).max(99),
      last_name: string().min(1).max(99),
      birth_date: date(),
      gender: string().oneOf(['masculino', 'feminino', 'outro']),
      cpf: string().test('test-invalid-cpf', 'cpf inválido', YupUtils.isCPFValid())
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(11, 'Must be exactly 11 digits')
        .max(11, 'Must be exactly 11 digits'),
      phone: string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(11, 'Must be exactly 11 digits')
        .max(11, 'Must be exactly 11 digits'),
      email: string().email(),
      password: string().min(6)
        .when(['new_password'], (new_password, schema) => new_password ? schema.required() : schema),
      new_password: string().min(6)
    }).noUnknown()
  }
};

export default {
  login: object(schemas.login),
  register: object(schemas.register),
  update: object(schemas.update)
};
