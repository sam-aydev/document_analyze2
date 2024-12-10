import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  documentName: string;

  @Column({
    type: 'varchar',
    length: 512,
  })
  path: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  mimeType: string;

  @ManyToOne(() => User, (user) => user.documents)
  author: User;
}
