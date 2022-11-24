require('dotenv').config();

const credentials = {
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  url: process.env.DATABASE_URI
};

const options = {
  dialect: 'postgres',
  logging: false,
  define: {
    underscored: true
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

module.exports = {
  ...credentials,
  ...options,
  options
};
