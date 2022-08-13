import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { TodosController } from './controller/todos.controller';
import { Tag } from './entity/tag.entity';
import { Todo } from './entity/todo.entity';
import { TodosService } from './service/todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Tag, Event])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
