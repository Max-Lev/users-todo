import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersResponseDto } from './dto/users-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {

  }

  @Get()
  findAll(): Promise<UsersResponseDto> {
    // return new Promise((resolve, reject) => {
    //   setTimeout(async () => {
    //     try {
    //       const response = await this.usersService.findAll();
    //       resolve(response);
    //     } catch (error) {
    //       reject(error);
    //     }
    //   }, 4000); 
    // });
      let response;
      response = this.usersService.findAll();
      return response;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
