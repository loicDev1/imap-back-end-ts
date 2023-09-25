import { Diagnostic } from 'src/diagnostic/entities/diagnostic.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('resource')
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  type: string;

  @ManyToOne((type) => Diagnostic, (diagnostic) => diagnostic.resource)
  diagnostic: Diagnostic;
}
