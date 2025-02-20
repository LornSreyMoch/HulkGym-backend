import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm';
import { BranchContact } from './branchContact.entity';

@Entity('branch')
export class Branch {
@PrimaryGeneratedColumn('uuid')
id: string;

@OneToMany(() => BranchContact, (branchContact) => branchContact.id)
branchContacts: BranchContact[];

@Column({ type: 'varchar', length: 255})
name: string;

@Column({type: 'text'})
location: string;

@Column({type: 'varchar', length:20})
phone_number: string;

@Column({type: 'varchar', length: 255})
image: string;
}
