import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { Message } from './message';
import { College } from '.';

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

    @Column({ nullable: true })
    dob: string;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    major: string;

    @Column({ nullable: true })
    degree: string;

    @Column({ nullable: true })
    batch: string;

    @Column({ nullable: true })
    registerNo: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ default: false })
    admin: boolean;

    @Column({ default: false })
    approved: boolean;

    @OneToMany((type) => Message, (message) => message.alumni)
    messages: Message[];

    @ManyToOne((type) => College, (college) => college.alumni)
    college: College;
}
