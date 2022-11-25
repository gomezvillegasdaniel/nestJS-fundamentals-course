import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';
import { TodosModule } from 'todos/todos.module';
import { TodosRatingService } from './todos-rating.service';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    }),
    TodosModule,
  ],
  providers: [TodosRatingService],
})
export class TodosRatingModule {}
