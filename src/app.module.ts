import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
// dotenv 패키지 직접 사용
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        retryAttempts: 10,
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'study',
        username: 'root',
        password: process.env.DATABASE_PASSWORD,
        entities: [path.join(__dirname, '/entities/**/*.entity.{js,ts}')],
        synchronize: false, // 무조건 false 로 해두기.
        logging: true, // typeorm 쿼리 실행시, MySQL의 쿼리문을 터미널에 보여줍니다.
        timezone: 'local',
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
