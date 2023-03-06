import { Router } from 'express';

import schemaValidator from '../utils/schema-validator';
import tableSchema from '../schemas/table';

import TableController from '../controllers/table';

export default class Table {
  constructor() {
    this.tableController = new TableController();
  }

  setup() {
    const router = new Router();

    // router.post('/', schemaValidator.validate(tableSchema.create), this.tableController.create);
    // router.get('/:id', schemaValidator.validate(tableSchema.list), this.tableController.list);
    // router.get('/:id', schemaValidator.validate(tableSchema.find), this.tableController.find);
    // router.put('/:id', schemaValidator.validate(tableSchema.update), this.tableController.update);

    return router;
  }
}
