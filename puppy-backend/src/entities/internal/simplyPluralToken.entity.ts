import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EncryptionMode } from '../../types/encryptionMode';
import { WebUser } from './webUser.entity';

@Entity()
export class SimplyPluralToken {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('text')
  discordUserId: string;

  @Column('text')
  token: string;

  @Column({
    type: 'enum',
    enum: EncryptionMode,
    default: EncryptionMode.PLAINTEXT,
  })
  encryptionMode: EncryptionMode;

  @OneToOne(() => WebUser, (user) => user.simplyPluralToken)
  webUser: WebUser;
}
