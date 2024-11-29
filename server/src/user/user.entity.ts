import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Task } from '../tasks/tasks.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Username', example: 'johndoe' })
  username: string;

  @Column()
  @ApiProperty({ description: 'Hashed password' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  @ApiProperty({ 
    enum: UserRole, 
    default: UserRole.USER,
    description: 'User role (USER or ADMIN)'
  })
  role: UserRole;

  @OneToMany(() => Task, (task) => task.owner)
  @ApiProperty({ type: () => Task, isArray: true })
  tasks: Task[];
}