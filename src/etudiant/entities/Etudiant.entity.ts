import { User } from 'src/user/entities/User.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class Etudiant extends User {
  @Column()
  niveau: number;
}
