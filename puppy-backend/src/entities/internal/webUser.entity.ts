import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AccessToken } from '../discord/accessToken.entity';
import { UserGuildRecord } from './userGuildRecord.entity';
import { Instance } from './instance.entity';
import { SimplyPluralToken } from './simplyPluralToken.entity';

@Entity()
@Index(['userId'], { unique: true })
export class WebUser {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('text')
  userId: string;

  @Column('text')
  username: string;

  @Column('text', { nullable: true })
  avatar?: string;

  @OneToMany(() => AccessToken, (accessToken) => accessToken.webUser)
  accessTokens: Array<AccessToken>;

  @OneToMany(
    () => UserGuildRecord,
    (userGuildRecord) => userGuildRecord.webUser,
  )
  guildRecords: Array<UserGuildRecord>;

  @OneToMany(() => Instance, (instance) => instance.webUser)
  ownedInstances: Array<Instance>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => SimplyPluralToken, (spToken) => spToken.webUser, {
    nullable: true,
  })
  simplyPluralToken: SimplyPluralToken;
}
