import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Module {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('text')
  name: string;

  @Column('text')
  friendlyName: string;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  enabledInstances?: Array<string>;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  enabledGuilds?: Array<string>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
