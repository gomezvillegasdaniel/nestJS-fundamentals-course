import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { Tag } from '../entity/tag.entity';
import { Todo } from '../entity/todo.entity';
import { TODO_EXTRA_TAGS } from '../todos.constants';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly dataSource: DataSource, // inject decorators are not needed anymore
    @Inject(TODO_EXTRA_TAGS) todoExtraTags: string[],
    private readonly configSvc: ConfigService,
  ) {
    const databaseHost = this.configSvc.get<string>('DATABASE_HOST');
    console.log('databaseHost:', databaseHost);
    console.log(todoExtraTags);
  }

  async recommendTodo(todo: Todo) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      todo.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_todo';
      recommendEvent.type = 'todo';
      recommendEvent.payload = { todoId: todo.id };

      await queryRunner.manager.save(todo);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

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

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return await this.todoRepository.find({
      relations: {
        tags: true,
      },
      skip: offset,
      take: limit,
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
