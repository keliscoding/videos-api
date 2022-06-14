import { v4 as uuid } from 'uuid';

class Video {
  id: string;
  title: string;
  description: string;
  url: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.created_at = new Date();
    }
  }
}

export { Video };
