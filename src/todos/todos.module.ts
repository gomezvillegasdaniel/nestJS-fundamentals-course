import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { TodosController } from './controller/todos.controller';
import { Tag } from './entity/tag.entity';
import { Todo } from './entity/todo.entity';
import { TodosService } from './service/todos.service';

// class MockTodosService {}

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Tag, Event])],
  controllers: [TodosController],
  // providers: [{ provide: TodosService, useValue: new MockTodosService() }], // use this in case you need to use a mock as a provider
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}
