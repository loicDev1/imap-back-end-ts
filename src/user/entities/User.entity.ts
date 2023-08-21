import { UserRoleEnum } from 'src/Generics/UserRoleEnum';
import { Timestamp } from 'src/Generics/TimeStamp';
import { Intervention } from 'src/intervention/entities/Intervention.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nom: string;

  @Column({ length: 50 })
  Prenom: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column()
  isVerified: boolean;

  @Column({
    type : 'enum',
    enum : UserRoleEnum,
    default : UserRoleEnum.ADMIN
  })
  role: string;

  @Column()
  isBlocked: boolean;

  @ManyToOne(
    type => User,
    user => user.createdBy
  )
  createdBy: User;

  @ManyToOne(
    type => User,
    user => user.updatedBy
  )
  updatedBy: User;

  @ManyToOne(
    type => User,
    user => user.blockedBy
  )
  blockedBy: User[];

  @OneToMany(
    (type) => Intervention,
    (intervention) => intervention.user
  )
  intervention: Intervention[];
}