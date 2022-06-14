import 'reflect-metadata';
import express from 'express';

import './videos/infra/typeorm/index';

import handleError from './middleware/handleError';

const app = express();

app.use(handleError);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };
