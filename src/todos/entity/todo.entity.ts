import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.todos, { cascade: true })
  tags: Tag[];

  @Column({ default: 0 })
  recommendations: number;
}
