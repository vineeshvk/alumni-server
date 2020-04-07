import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @CreateDateColumn()
    createTime: string;

    @Column()
    contact: string;

    @Column()
    venue: string;

    @Column()
    scheduledDate: string;
}
