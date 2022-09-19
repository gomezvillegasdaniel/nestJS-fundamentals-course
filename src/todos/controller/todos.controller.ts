import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorators';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodosService } from '../service/todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosSvc: TodosService) {}

  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // simulating a timeout in order to test the timeout interceptor
    // const { limit, offset } = paginationQuery;
    return this.todosSvc.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosSvc.findOne(id);
  }

  @Post()
  create(@Body() body: CreateTodoDto) {
    return this.todosSvc.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTodoDto) {
    return this.todosSvc.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosSvc.remove(id);
  }
}
