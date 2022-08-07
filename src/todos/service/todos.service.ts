import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { Todo } from '../entity/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  async remove(id: string) {
    const todo = await this.findOne(id);
    return this.todoRepository.remove(todo);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.preload({
      id: +id,
      ...updateTodoDto,
    });
    if (!todo) {
      throw new NotFoundException(`Todo #${id} not found`);
    }
    return this.todoRepository.save(todo);
  }

  async findOne(id: string) {
    const todo = this.todoRepository.findOne({ where: { id: +id } });
    if (!todo) {
      throw new HttpException(`Todo #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  async findAll() {
    return this.todoRepository.find();
  }
}
