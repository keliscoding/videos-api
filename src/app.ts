import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import './videos/infra/typeorm/index';

import handleError from './middleware/handleError';
import { router } from './routes';

const app = express();

app.use('/api', router);

app.use(handleError);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };
