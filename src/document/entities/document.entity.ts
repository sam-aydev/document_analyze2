import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { documentTypes } from '../enums/document-types.enum';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false
  })
  path: string;

  @Column({
    type: 'enum',
    enum: documentTypes,
    default: documentTypes.PDF,
    nullable: false
  })
  type: string

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false
  })
  mimeType: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date

  @ManyToOne(() => User, (user) => user.documents)
  author: User;
}
