import { app } from './app';
import './infra/typeorm/index';

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
