import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { UserInfo } from './user.entity'; // Assuming UserInfo entity is in user.entity.ts
  
  @Entity('activity')
  export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // UUID as a primary key
  
    @ManyToOne(() => UserInfo, (user) => user.activities)
    @JoinColumn({ name: 'userId' })
    user: UserInfo; // Relationship with UserInfo entity
  
    @Column({ type: 'varchar', length: 30 })
    title: string; // Activity titleA
  
    @Column({ type: 'varchar', length: 30 })
    icon: string; // Activity icon (emoji or text)
  
    @Column({ type: 'int' })
    sets: number; // Number of sets
  
    @Column({ type: 'int' })
    reps: number; // Number of reps per set
  
    @Column({ type: 'int', default: 1 })
    currentSet: number; // Current set (default: 1)
  
    @CreateDateColumn()
    createAt: Date; // Timestamp of creation
  
    @UpdateDateColumn()
    updateAt: Date; // Timestamp of last update
  }
  