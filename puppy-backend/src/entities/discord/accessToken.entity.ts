/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { WebUser } from '../internal/webUser.entity';
import { EncryptionMode } from 'src/types/encryptionMode';

@Entity()
@Index('clientid_userid_idx', ['clientId', 'userId'], { unique: true })
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('text')
  clientId: string;

  @Column('text')
  userId: string;

  @ManyToOne(() => WebUser, (user) => user.accessTokens)
  webUser: WebUser;

  @Column('text')
  accessToken: string;

  @Column('text')
  tokenType: string;

  @Column('text')
  refreshToken: string;

  @Column({
    type: 'text',
    array: true,
  })
  scopes: Array<string>;

  @Column('int')
  expiresIn: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: EncryptionMode,
    default: EncryptionMode.PLAINTEXT,
  })
  encryptionMode: EncryptionMode;
}
