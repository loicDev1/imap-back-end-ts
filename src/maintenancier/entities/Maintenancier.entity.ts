import { Personnel } from "src/personnel/entities/Personnel.entity";
import { Column, Entity } from "typeorm";

@Entity('user')
export class Maintenancier extends Personnel{
    @Column({nullable: true})
    age  : number;
}