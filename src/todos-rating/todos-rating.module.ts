import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';
import { TodosModule } from 'todos/todos.module';
import { TodosRatingService } from './todos-rating.service';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
    }),
    TodosModule,
  ],
  providers: [TodosRatingService],
})
export class TodosRatingModule {}
