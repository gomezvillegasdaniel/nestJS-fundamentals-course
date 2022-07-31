import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    this.todos.push(createTodoDto);
    return createTodoDto;
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
    const todo = this.todos.find((todo) => todo.id === +id);
    if (!todo) {
      throw new HttpException(`Todo #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  findAll() {
    return this.todos;
  }
}
