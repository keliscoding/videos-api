import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml-js';

import handleError from './middleware/handleError';
import '@shared/container';
import { router } from './routes';

const app = express();
const swaggerDocument = yaml.load('./swagger.yaml');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use(handleError);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };
