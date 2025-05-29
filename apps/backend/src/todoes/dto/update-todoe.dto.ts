import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoeDto } from './create-todoe.dto';

export class UpdateTodoeDto extends PartialType(CreateTodoeDto) {}
