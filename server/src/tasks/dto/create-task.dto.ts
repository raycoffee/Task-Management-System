import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Implement login feature' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Add JWT authentication and user login functionality' })
  @IsNotEmpty()
  @IsString()
  description: string;
}