import { OperationEnum } from 'src/Generics/OperationsEnum';
import { Timestamp } from 'src/Generics/TimeStamp';
import { User } from 'src/user/entities/User.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 70, update: false })
  description: string;

  // @Column({
  //   type: 'enum',
  //   enum: OperationEnum,
  //   update: false
  // })
  @Column({ update: false })
  typeOperation: string;

  @ManyToOne((type) => User, (user) => user.log, {
    cascade: true,
    eager: true,
  })
  user: User;
}
