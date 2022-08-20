import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { TodosController } from './controller/todos.controller';
import { Tag } from './entity/tag.entity';
import { Todo } from './entity/todo.entity';
import { TodosService } from './service/todos.service';
import { TODO_EXTRA_TAGS } from './todos.constants';

class ConfigService {}
class DevConfigService {}
class ProdConfigService {}
// class MockTodosService {}

@Injectable()
export class TodosExtraTagsFactory {
  create() {
    // do something
    return ['TAG4', 'TAG5', 'TAG6'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Tag, Event])],
  controllers: [TodosController],
  // providers: [{ provide: TodosService, useValue: new MockTodosService() }], // use this in case you need to use a mock as a provider
  providers: [
    TodosService,
    TodosExtraTagsFactory,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'dev' ? DevConfigService : ProdConfigService,
    },
    // { provide: TODO_EXTRA_TAGS, useValue: ['TAG1', 'TAG2'] },
    {
      provide: TODO_EXTRA_TAGS,
      useFactory: (todosExtraTagsFactory: TodosExtraTagsFactory) =>
        todosExtraTagsFactory.create(),
      inject: [TodosExtraTagsFactory],
    },
  ],
  exports: [TodosService],
})
export class TodosModule {}
