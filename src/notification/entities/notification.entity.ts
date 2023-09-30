import { Timestamp } from 'src/Generics/TimeStamp';
import { Diagnostic } from 'src/diagnostic/entities/diagnostic.entity';
import { Intervention } from 'src/intervention/entities/Intervention.entity';
import { User } from 'src/user/entities/User.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('')
export class Notification extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isOpen: boolean;

  @ManyToOne((type) => User, (user) => user.intervention, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  sender: User;

  @ManyToOne((type) => User, (user) => user.intervention, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  receiver: User;

  @ManyToOne((type) => Intervention, (inter) => inter.notification, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  intervention: Intervention;

  @ManyToOne((type) => Diagnostic, (diagnostic) => diagnostic.notification, {
    nullable: true,
    eager: true,
  })
  diagnostic: Diagnostic;
}
