import { v4 as uuid } from 'uuid';

class Category {
  id: string;
  title: string;
  created_at: Date;

  constructor() {
    this.id = uuid();
  }
}

export { Category };
