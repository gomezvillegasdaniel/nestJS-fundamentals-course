import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { Tag } from '../entity/tag.entity';
import { Todo } from '../entity/todo.entity';
import { Event } from 'events/entities/event.entity';
import { TodosService } from './todos.service';
import todosConfig from 'config/todos.config';
import { TODO_EXTRA_TAGS } from '../todos.constants';
import { createMockRepository, MockRepository } from 'test/mock/MockRepository';
import { createMockService } from 'test/mock/MockService';

describe('TodosService', () => {
  let service: TodosService;
  let repository: MockRepository;

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
    repository = module.get<MockRepository>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when ToDo with ID exists', () => {
      it('should returns the ToDo object', async () => {
        const toDoId = '1';
        const expectedToDo = {};

        repository.findOne.mockReturnValue(expectedToDo);
        const toDo = await service.findOne(toDoId);
        expect(toDo).toEqual(expectedToDo);
      });
    });
    describe('otherwise', () => {
      it('should returns HttpException 404', async () => {
        const toDoId = '1';
        repository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(toDoId);
          expect(false).toBeTruthy(); // it should never hit this line
        } catch (err) {
          expect(err).toBeInstanceOf(HttpException);
          expect(err.status).toBe(404);
          expect(err.message).toEqual(`Todo #${toDoId} not found`);
        }
      });
    });
  });
});
