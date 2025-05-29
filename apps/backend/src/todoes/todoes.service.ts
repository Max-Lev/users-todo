import { Injectable } from '@nestjs/common';
import { CreateTodoeDto } from './dto/create-todoe.dto';
import { UpdateTodoeDto } from './dto/update-todoe.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TodoesService {

   apiUrl = this.configService.get<string>('TODOES_API');
 
   constructor(private httpService: HttpService,
     private readonly configService: ConfigService) {
 
   }

  //  async findByUserId(id:number):Promise<any[]>{
  //   return await this.httpService.get(`${this.apiUrl}/todoes?userId=${id}`);
  //  }

  create(createTodoeDto: CreateTodoeDto) {
    return 'This action adds a new todoe';
  }

  findAll() {
    return `This action returns all todoes`;
  }

  async findTodoByUserId(id: number) :Promise<any[]> {
    const response$ =  this.httpService.get<any>(`${this.apiUrl}/user/${id}`);
    const response = await firstValueFrom<any>(response$);
    return response.data;
  }

  update(id: number, updateTodoeDto: UpdateTodoeDto) {
    return `This action updates a #${id} todoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoe`;
  }
}
