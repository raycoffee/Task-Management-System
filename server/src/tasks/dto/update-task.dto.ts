import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.entity';
import { ApiProperty } from '@nestjs/swagger'; 

export class UpdateTaskDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: TaskStatus, required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}