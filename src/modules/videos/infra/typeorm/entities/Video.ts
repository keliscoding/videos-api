import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import {
  PrimaryColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('videos')
class Video {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'belongs',
    joinColumns: [{ name: 'video_id' }],
    inverseJoinColumns: [{ name: 'category_id' }],
  })
  categories: Category[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Video };
