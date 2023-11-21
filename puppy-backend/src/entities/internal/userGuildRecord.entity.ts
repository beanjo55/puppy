import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { WebUser } from './webUser.entity';

@Entity()
@Index('user_guild_idx', ['userId', 'guildId'], { unique: true })
@Index('user_idx', ['userId'])
export class UserGuildRecord {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('text')
  userId: string;

  @Column('text')
  guildId: string;

  @Column({ default: 'false' })
  isOwner: boolean;

  @Column({ default: 'false' })
  isAdmin: boolean;

  @Column({
    type: 'text',
    array: true,
  })
  roles: Array<string>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => WebUser, (user) => user.guildRecords)
  webUser: WebUser;
}
