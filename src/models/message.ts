import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Alumni } from '.';

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @Column({ default: false })
    sentByUser: boolean;

    @ManyToOne((type) => Alumni, (alumni) => alumni.messages)
    alumni: Alumni;
}
