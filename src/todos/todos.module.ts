import { Injectable, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Connection } from 'typeorm';
import { TodosController } from './controller/todos.controller';
import { Tag } from './entity/tag.entity';
import { Todo } from './entity/todo.entity';
import { TodosService } from './service/todos.service';
import { TODO_EXTRA_TAGS } from './todos.constants';

class ConfigService {}
class DevConfigService {}
class ProdConfigService {}
// class MockTodosService {}

// @Injectable()
// export class TodosExtraTagsFactory {
//   create() {
//     // do something
//     return ['TAG4', 'TAG5', 'TAG6'];
//   }
// }

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Tag, Event]), ConfigModule],
  controllers: [TodosController],
  // providers: [{ provide: TodosService, useValue: new MockTodosService() }], // use this in case you need to use a mock as a provider
  providers: [
    TodosService,
    // TodosExtraTagsFactory,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'dev' ? DevConfigService : ProdConfigService,
    },
    // { provide: TODO_EXTRA_TAGS, useValue: ['TAG1', 'TAG2'] },
    {
      provide: TODO_EXTRA_TAGS,
      // Note "async" here, and Promise/Async event inside the Factory function
      // Could be a database connection / API call / etc
      // In our case we're just "mocking" this type of event with a Promise
      useFactory: async (connection: Connection): Promise<string[]> => {
        // const todoTags = await connection.query('SELECT * ...');
        return Promise.resolve(['TAG7', 'TAG8']);
      },
      inject: [Connection],
    },
  ],
  exports: [TodosService],
})
export class TodosModule {}
