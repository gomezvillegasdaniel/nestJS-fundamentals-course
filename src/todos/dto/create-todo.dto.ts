import { IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  readonly name: string;
  // @IsString({ each: true }) // for arrays
  @IsString()
  readonly description: string;
}
