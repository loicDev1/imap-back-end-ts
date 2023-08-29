import { Timestamp } from 'src/Generics/TimeStamp';
import { User } from 'src/user/entities/User.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('')
export class Notification extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  content: string;

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
}
