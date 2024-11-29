import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Request } from 'express';
import { User } from '../user/user.entity';
import { UserRole } from '../user/user.entity';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: Request & { user: User }
  ) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @Get()
  getTasks(@Req() req: Request & { user: User }) {
    if (req.user.role === UserRole.ADMIN) {
      return this.tasksService.findAll();
    }
    return this.tasksService.findByUser(req.user.id);
  }

  @Get(':id')
  async getTask(
    @Param('id') id: string,
    @Req() req: Request & { user: User }
  ) {
    const task = await this.tasksService.findOne(id);

    if (task.owner.id !== req.user.id && req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }

    return task;
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request & { user: User }  // Fixed: changed owner to user
  ) {
    const task = await this.tasksService.findOne(id);

    if (task.owner.id !== req.user.id && req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }

    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(
    @Param('id') id: string,
    @Req() req: Request & { user: User }
  ) {
    const task = await this.tasksService.findOne(id);

    if (task.owner.id !== req.user.id && req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }

    return this.tasksService.remove(id);
  }
}