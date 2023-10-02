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
import { Service } from 'src/Generics/UserServiceEnum';
import { Log } from 'src/log/entities/log.entity';
import { Diagnostic } from 'src/diagnostic/entities/diagnostic.entity';

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
    default: UserRoleEnum.PERSONNEL,
  })
  role: string;

  @Column({
    // type: 'enum',
    //  enum: UserPersonnelEnum,
    nullable: false,
  })
  service: Service;

  @Column({ default: false })
  isBlocked: boolean;

  @ManyToOne((type) => User, (user) => user.createdBy)
  createdBy: User;

  @ManyToOne((type) => User, (user) => user.updatedBy)
  updatedBy: User;

  @Column({ nullable: true })
  profilePicture: string;

  //@Column({nullable: false})
  @ManyToOne((type) => User, (user) => user.blockedBy)
  blockedBy: User[];

  @OneToMany((type) => Intervention, (intervention) => intervention.user)
  intervention: Intervention[];

  @OneToMany((type) => Log, (log) => log.user)
  log: Log[];

  @OneToMany((type) => Diagnostic, (Diagnostic) => Diagnostic.user)
  diagnostic: Diagnostic[];
}
