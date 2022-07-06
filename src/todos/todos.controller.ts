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

@Controller('todos')
export class TodosController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all todos (limit ${limit} offset ${offset})`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} todo`;
  }

  @Post()
  create(@Body() body: any) {
    // This actions creates a new todo
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return `This action updates #${id} todo`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} todo`;
  }
}
