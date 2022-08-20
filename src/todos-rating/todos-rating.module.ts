import { Module } from '@nestjs/common';
import { TodosModule } from 'src/todos/todos.module';
import { TodosRatingService } from './todos-rating.service';

@Module({
  imports: [TodosModule],
  providers: [TodosRatingService],
})
export class TodosRatingModule {}
