import { Module } from '@nestjs/common';
import { TodosController } from './controller/todos.controller';
import { TodosService } from './service/todos.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
