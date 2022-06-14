import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import handleError from './middleware/handleError';
import '@shared/container';

import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.use(handleError);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };
