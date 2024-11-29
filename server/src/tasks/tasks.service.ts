import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { User } from '../user/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      owner: user  // Changed from user to owner
    });

    return this.tasksRepository.save(task);
  }

  async findAll() {
    return this.tasksRepository.find({
      relations: ['owner']
    });
  }

  async findByUser(userId: string) { 
    return this.tasksRepository.find({
      where: { owner: { id: userId } }, 
      relations: ['owner']
    });
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['owner']
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    
    Object.assign(task, updateTaskDto);
    
    return this.tasksRepository.save(task);
  }

  async remove(id: string) {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}