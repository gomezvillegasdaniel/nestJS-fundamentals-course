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
import { Tag } from '../entity/tag.entity';
import { Todo } from '../entity/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const tags = await Promise.all(
      createTodoDto.tags.map((name) => this.preloadTagByName(name)),
    );
    const todo = this.todoRepository.create({
      ...createTodoDto,
      tags,
    });
    return this.todoRepository.save(todo);
  }

  async remove(id: string) {
    const todo = await this.findOne(id);
    return this.todoRepository.remove(todo);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const tags =
      updateTodoDto.tags &&
      (await Promise.all(
        updateTodoDto.tags.map((name) => this.preloadTagByName(name)),
      ));
    const todo = await this.todoRepository.preload({
      id: +id,
      ...updateTodoDto,
      tags,
    });
    if (!todo) {
      throw new NotFoundException(`Todo #${id} not found`);
    }
    return await this.todoRepository.save(todo);
  }

  async findOne(id: string) {
    const todo = await this.todoRepository.findOne({
      where: { id: +id },
      relations: { tags: true },
    });
    if (!todo) {
      throw new HttpException(`Todo #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  async findAll() {
    return await this.todoRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const existingTag = await this.tagRepository.findOne({
      where: { name: name },
    });
    if (existingTag) {
      return existingTag;
    }
    return this.tagRepository.create({ name });
  }
}
