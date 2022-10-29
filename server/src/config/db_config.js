import dotenv from 'dotenv';

dotenv.config();

export default {
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
