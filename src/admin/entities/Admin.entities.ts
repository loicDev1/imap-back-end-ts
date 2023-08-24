import { Personnel } from "src/personnel/entities/Personnel.entity";
import { Entity } from "typeorm";

@Entity('user')
export class Admin extends Personnel{

}