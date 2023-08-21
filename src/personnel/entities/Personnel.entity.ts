import { User } from "src/user/entities/User.entity";
import { Column, Entity } from "typeorm";

@Entity('user')
export class Personnel extends User{
    @Column()
    anneeService: string;
}