import { Timestamp } from 'src/Generics/TimeStamp';
import { Resource } from 'src/resource/entities/resource.entity';
import { User } from 'src/user/entities/User.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// type Resource = {
//   id: number;
//   value: string;
// };

@Entity('diagnostic')
export class Diagnostic extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500 })
  problematique: string;

  @Column('varchar', { length: 1000 })
  analyse: string;

  @Column('varchar', { length: 1000 })
  perspective: string;

  @OneToMany((type) => Resource, (resource) => resource.diagnostic, {
    eager: true,
  })
  resource: Resource[];

  @ManyToOne((type) => User, (user) => user.diagnostic, {
    cascade: true,
    eager: true,
  })
  user: User;

  @OneToMany((type) => Notification, (notif) => notif.diagnostic)
  notification: Notification;
}
