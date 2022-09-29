// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger'; // this also implements @nestjs/mapped-types while enables the Dto for Swagger
import { CreateTodoDto } from './create-todo.dto';

// PartialType returns the type of the class is passed in it with the types declared as optional
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
