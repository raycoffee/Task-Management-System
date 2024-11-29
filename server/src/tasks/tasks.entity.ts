import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  import { User } from '../user/user.entity'
  
  export enum TaskStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED'
  }
  
  @Entity()
  export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @Column()
    description: string;
  
    @Column({
      type: 'enum',
      enum: TaskStatus,
      default: TaskStatus.OPEN
    })
    status: TaskStatus;
  
    @ManyToOne(() => User, user => user.tasks, { eager: false })
    owner: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }