import { UserRoleEnum } from 'src/Generics/UserRoleEnum';
import { Timestamp } from 'src/Generics/TimeStamp';
import { Intervention } from 'src/intervention/entities/Intervention.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nom: string;

  @Column({ length: 50 })
  prenom: string;

  @Column({ unique: true, nullable: false })
  email: string;

  // peut etre retiré car est deja geré par Firebase
  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.ETUDIANT,
  })
  role: string;

  @Column({ default: false })
  isBlocked: boolean;

  @ManyToOne((type) => User, (user) => user.createdBy)
  createdBy: User;

  @ManyToOne((type) => User, (user) => user.updatedBy)
  updatedBy: User;

  // @Column({ nullable: true, default: '' })
  // profilePicture: string;

  @ManyToOne((type) => User, (user) => user.blockedBy)
  blockedBy: User[];

  @OneToMany((type) => Intervention, (intervention) => intervention.user)
  intervention: Intervention[];
}
