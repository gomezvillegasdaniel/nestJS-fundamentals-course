import { TodoRefactor1660413916391 } from 'migrations/1660413916391-TodoRefactor';
import { SchemaSync1660415276830 } from 'migrations/1660415276830-SchemaSync';
import { Tag } from 'todos/entity/tag.entity';
import { Todo } from 'todos/entity/todo.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Todo, Tag],
  migrations: [TodoRefactor1660413916391, SchemaSync1660415276830],
});
