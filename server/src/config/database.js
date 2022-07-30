import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

class Database {
  constructor() {
    const dbConfig = {
      database: process.env.DATABASE,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT || 5432,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      define: {
        underscored: true
      }
    };

    this.connection = new Sequelize(dbConfig);
  }

  async setup() {
    this.loadModels();
    this.associateModels();
    return this.authenticate();
  }

  loadModels() {
    fs.readdirSync(`${__dirname}/../models`, { withFileTypes: true })
      .filter(entry => fs.statSync(`${__dirname}/../models/${entry.name}`).isFile())
      .map(entry => `${__dirname}/../models/${entry.name}`)
      .forEach(filePath => {
        const Model = require(filePath).default;

        if (!Model || Model.name === 'BaseModel') return;

        this.models[Model.name] = Model.load(this.sequelize, Sequelize);
      });
  }

  associateModels() {
    Object.values(this.models)
      .filter(model => typeof model.associate === 'function')
      .forEach(model => {
        model.models = this.models;
        model.sequelize = this.sequelize;
        model.associate(this.models);

        if (model.options && model.options.cache) {
          SequelizeCache(model).init();
        }
      });
  }

  async authenticate() {
    try {
      await this.connection.authenticate();
      return console.log('Database is connected.');
    } catch (error) {
      return console.log(`Database connection error: ${error}`);
    }
  }

  async disconnect() {
    try {
      await this.connection.close();
      return console.log('Database is disconnected.');
    } catch (error) {
      return console.log(`Database disconnection error: ${error}`);
    }
  }
};

export default Database;
