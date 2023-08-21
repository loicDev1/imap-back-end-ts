import { InterventionStatusEnum } from 'src/Generics/InterventionStatusEnum';
import { User } from 'src/user/entities/User.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('intervention')
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: InterventionStatusEnum,
  })
  status: string;

  @Column()
  message: string;

  @ManyToOne((type) => User, (user) => user.intervention, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  user: User;
}
