import { InterventionStatusEnum } from 'src/Generics/InterventionStatusEnum';
import { Notification } from 'src/notification/entities/notification.entity';
import { Timestamp } from 'src/Generics/TimeStamp';
import { User } from 'src/user/entities/User.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('intervention')
export class Intervention extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: InterventionStatusEnum,
    default: InterventionStatusEnum.DEBUT
  })
  status: string;

  @Column({nullable: false})
  titre: string;

  @Column({nullable: false})
  description: string;

  @Column()
  service: string;

  @ManyToOne((type) => User, (user) => user.intervention, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  user: User;

  @OneToMany((type) => Notification, (notif) => notif.intervention)
  notification: Notification;
}
