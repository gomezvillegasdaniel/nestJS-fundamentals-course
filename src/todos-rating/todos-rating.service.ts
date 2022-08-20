import { Injectable } from '@nestjs/common';
import { TodosService } from 'src/todos/service/todos.service';

@Injectable()
export class TodosRatingService {
  constructor(private readonly todosSvc: TodosService) {}
}
