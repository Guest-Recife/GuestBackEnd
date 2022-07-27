import cors from 'cors';

import './database/index';
import express from 'express';
import routes from './routes/routes.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(3001,
  console.log('Servidor iniciado!'),
  console.log('CTRL + Clique em: http://localhost:3001'));