import cors from 'cors';

import Database from './config/database.js';
import express from 'express';
import routes from './routes/routes.js';

class App {
  constructor() {
    this.app = express();
    this.database = new Database();
    this.port = '3001';
  }

  async start() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use(routes);

    await this.database.setup();

    this.app.listen(this.port,
      console.log(`Servidor iniciado na porta ${this.port}`));
  }
};

export default App;
