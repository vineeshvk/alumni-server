import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Alumni } from '.';

@Entity()
export class College extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @OneToMany((type) => Alumni, (alumni) => alumni.college)
    alumni: Alumni[];
}
