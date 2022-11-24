import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';

import dbConfig from './db_config.js';

dotenv.config();

class Database {
  constructor() {
    this.models = {};
    this.connection = new Sequelize(dbConfig.url, dbConfig.options);
  }

  loadModels() {
    fs.readdirSync(`${__dirname}/../models`, { withFileTypes: true })
      .filter(entry => fs.statSync(`${__dirname}/../models/${entry.name}`).isFile())
      .map(entry => `${__dirname}/../models/${entry.name}`)
      .forEach(filePath => {
        const Model = require(filePath).default;

        if (!Model || Model.name === 'BaseModel') return;

        this.models[Model.name] = Model.load(this.connection, Sequelize);
      });
  }

  associateModels() {
    Object.values(this.models)
      .filter(model => typeof model.associate === 'function')
      .forEach(model => {
        model.models = this.models;
        model.sequelize = this.connection;
        model.associate(this.models);

        if (model.options && model.options.cache) {
          // SequelizeCache(model).init();
        }
      });
  }

  async authenticate() {
    try {
      await this.connection.authenticate();
      console.log('Database is connected.'); // eslint-disable-line no-console
    } catch (error) {
      console.log(`Database connection error: ${error}`); // eslint-disable-line no-console
    }
  }

  async disconnect() {
    try {
      await this.connection.close();
      console.log('Database is disconnected.'); // eslint-disable-line no-console
    } catch (error) {
      console.log(`Database disconnection error: ${error}`); // eslint-disable-line no-console
    }
  }

  setup() {
    this.loadModels();
    this.associateModels();

    return this.authenticate();
  }
}

export default Database;
