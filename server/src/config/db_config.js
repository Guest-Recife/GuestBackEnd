import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  url: process.env.DATABASE_URI,
  options: {
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
  }
};
