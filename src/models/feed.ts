import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Feed extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'uuid' })
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;
}
