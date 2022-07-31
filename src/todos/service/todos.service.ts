import { Injectable } from '@nestjs/common';
import { Todo } from '../entity/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: 1,
      name: 'clean the dishes',
      description: 'very well',
    },
  ];

  create(createTodoDto: any) {
    return this.todos.push(createTodoDto);
  }

  remove(id: string) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === +id);
    if (todoIndex >= 0) {
      this.todos.splice(todoIndex, 1);
    }
  }

  update(id: string, updateTodoDto: any) {
    const existingTodo = this.findOne(id);
    if (existingTodo) {
      // update the existing Todo
    }
  }

  findOne(id: string) {
    return this.todos.find((todo) => todo.id === +id);
  }

  findAll() {
    return this.todos;
  }
}
