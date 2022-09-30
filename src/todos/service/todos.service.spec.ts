import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Tag } from '../entity/tag.entity';
import { Todo } from '../entity/todo.entity';
import { Event } from 'events/entities/event.entity';
import { TodosService } from './todos.service';
import { ConfigService } from '@nestjs/config';
import todosConfig from 'config/todos.config';
import { TODO_EXTRA_TAGS } from '../todos.constants';
import { createMockRepository } from 'test/mock/MockRepository';
import { createMockService } from 'test/mock/MockService';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Event),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Todo),
          useValue: createMockRepository(),
        },
        { provide: ConfigService, useValue: createMockService() },
        { provide: todosConfig.KEY, useValue: {} },
        { provide: TODO_EXTRA_TAGS, useValue: {} },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
