import express from 'express';

import handleError from './middleware/handleError';

const app = express();

app.use(handleError);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };
