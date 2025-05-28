import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { User } from './entities/user.entity';
import { UsersResponseDto } from './dto/users-response.dto';

@Injectable()
export class UsersService {

  apiUrl = this.configService.get<string>('USERS_API');

  constructor(private httpService: HttpService,
    private readonly configService: ConfigService
  ) {

  }

  async findAll(): Promise<UsersResponseDto> {
    const response$ = this.httpService.get<User[]>(this.apiUrl);
    const response = await firstValueFrom<User[]>(response$);
    // console.log(JSON.stringify(response.data));
    return response.data;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }



  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
