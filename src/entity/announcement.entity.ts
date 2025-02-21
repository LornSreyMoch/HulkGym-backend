import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Branch } from './branchMonika';

@Entity('announcement')
export class Announcement {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string; 

    @ManyToOne(() => Branch, (branch) => branch.announcements, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'branchId' })
    branch: Branch; 

    @CreateDateColumn()
    createdAt: Date; 

    @UpdateDateColumn()
    updatedAt: Date; 
}
