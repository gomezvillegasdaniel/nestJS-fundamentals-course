import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TodosModule } from 'src/todos/todos.module';
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
