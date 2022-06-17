import { v4 as uuid } from 'uuid';

class Account {
  id?: string;
  username: string;
  email: string;
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Account };
