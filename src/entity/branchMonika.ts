import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Announcement } from './announcement.entity';
// import { Notice } from './notice.entity';

@Entity('branch')
export class Branch {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    location: string;

    @OneToMany(() => Announcement, (announcement) => announcement.branch)
    announcements: Announcement[];

    // @OneToMany(() => Notice, (notice) => notice.branch)
    // notices: Notice[];
}
