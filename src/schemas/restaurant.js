import {
  object,
  string,
  number,
  boolean
} from 'yup';

import YupUtils from '../utils/yup';

const schemas = {
  find: {
    params: object().shape({
      id: number().required().min(1)
    }).noUnknown()
  },
  update: {
    body: object().shape({
      name: string().min(1).max(99),
      cnpj: string().test('test-invalid-cnpj', 'cnpj inválido', YupUtils.isCNPJValid())
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(14, 'Must be exactly 14 digits')
        .max(14, 'Must be exactly 14 digits'),
      is_delivery: boolean(),
      cep: string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(8, 'Must be exactly 8 digits')
        .max(8, 'Must be exactly 8 digits'),
      state: string().min(1).max(99),
      city: string().min(1).max(99),
      district: string().min(1).max(99),
      address: string().min(1).max(99),
      number: number().min(1),
    }).noUnknown(),
    params: object().shape({
      id: number().required().min(1)
    }).noUnknown()
  }
};

export default {
  find: object(schemas.find),
  update: object(schemas.update)
};
