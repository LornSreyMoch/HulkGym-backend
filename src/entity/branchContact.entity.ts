import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { Branch } from './branch.entity';

@Entity('branchContact')
export class BranchContact {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Branch, (branch) => branch.id)
    branch: Branch;

    @Column({ type: 'varchar', length: 20 })
    phone: string;
}
