import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './todo.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Todo, (todo) => todo.tags)
  todos: Todo[];
}
