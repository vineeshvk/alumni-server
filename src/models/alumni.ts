import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Alumni extends BaseEntity{
    @PrimaryGeneratedColumn()//TODO: set the value to uuid
    id:string;
    
    @Column()
    name:string;

    @PrimaryColumn()
    email:string;

    @Column()
    password:string;

    @Column({default:false})
    admin:boolean

    @Column()
    approved:boolean;

}