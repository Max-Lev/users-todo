import { Module } from '@nestjs/common';
import { TodoesService } from './todoes.service';
import { TodoesController } from './todoes.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [TodoesController],
  providers: [TodoesService],
  imports:[HttpModule]
})
export class TodoesModule {}
