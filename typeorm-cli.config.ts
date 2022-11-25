import { TodoRefactor1660413916391 } from 'migrations/1660413916391-TodoRefactor';
import { SchemaSync1660415276830 } from 'migrations/1660415276830-SchemaSync';
import { Tag } from 'todos/entity/tag.entity';
import { Todo } from 'todos/entity/todo.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Todo, Tag],
  migrations: [TodoRefactor1660413916391, SchemaSync1660415276830],
});
