import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodoesService } from './todoes.service';
import { CreateTodoeDto } from './dto/create-todoe.dto';
import { UpdateTodoeDto } from './dto/update-todoe.dto';

@Controller('todoes')
export class TodoesController {
  constructor(private readonly todoesService: TodoesService) { }

  // @Get(':id')
  // async findByUserId(id:number){
  //   console.log('id',id);
  //   return await this.todoesService.findByUserId(id);
  // }



  @Post()
  create(@Body() createTodoeDto: CreateTodoeDto) {
    return this.todoesService.create(createTodoeDto);
  }

  @Get()
  findAll() {
    return this.todoesService.findAll();
  }

  @Get(':id')
  async findTodoByUserId(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return await this.todoesService.findTodoByUserId(numericId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoeDto: UpdateTodoeDto) {
    return this.todoesService.update(+id, updateTodoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoesService.remove(+id);
  }
}
