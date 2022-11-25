import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DBConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TEST_DATABASE_HOST,
  port: +process.env.TEST_DATABASE_PORT,
  username: process.env.TEST_DATABASE_USER,
  password: process.env.TEST_DATABASE_PASSWORD,
  database: process.env.TEST_DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: true,
};
