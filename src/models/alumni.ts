import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Alumni extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'uuid' }) //TODO: set the value to uuid
    id: string;

    @Column()
    name: string;

    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    admin: boolean;

    @Column()
    approved: boolean;
}
