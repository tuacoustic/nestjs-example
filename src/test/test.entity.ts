import { BaseEntity } from "../common/mysql/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('test')
export class TestEntity extends BaseEntity{
    @Column('varchar')
    name: string;
}