import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TodosRatingModule } from './todos-rating/todos-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import appConfig from './config/app.config';
import { DBConfig } from './config/db.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => DBConfig,
    }),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TodosModule,
    TodosRatingModule,
    DatabaseModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
