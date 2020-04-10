import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { College } from '.';
import { Message } from './message';

@Entity()
export class Alumni extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @Column()
    dob: string;

    @Column()
    gender: string;

    @Column()
    department: string;

    @Column()
    degree: string;

    @Column()
    batch: number;

    @Column()
    registerNo:string;

    @Column()
    phone: string;

    @Column({ default: false })
    admin: boolean;

    @Column({ default: false })
    approved: boolean;

    @OneToMany((type) => Message, (message) => message.alumni)
    messages: Message[];

    @ManyToOne(type => College, college => college.alumni)
    college: College;
}
