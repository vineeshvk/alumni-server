import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Alumni extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    admin: boolean;

    @Column({ default: false })
    approved: boolean;
}
