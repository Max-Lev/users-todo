import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';
import { TodoesModule } from './todoes/todoes.module';
@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    UsersModule,
    TodoesModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
