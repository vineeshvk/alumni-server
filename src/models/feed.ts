import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Feed extends BaseEntity{
    @PrimaryGeneratedColumn({})//TODO:change type to uudi
    id:string

    @Column()
    title:string

    @Column()
    description:string;

    @Column()
    image:string
}