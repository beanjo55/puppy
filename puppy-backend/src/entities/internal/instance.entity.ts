import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
  Entity,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { ClientSecrets } from './clientSecrets.entity';
import { WebUser } from './webUser.entity';

export enum ClientSetupState {
  INITIAL = 'initial', // user has entered token, the initial entry was saved to facilitate resuming and further validation
  VALUES = 'values', // the user has entered neccesarry settings on the dev portal
  COMPLETE = 'complete', // the instance has finished setup and is ready to login and be used
}

@Entity()
@Index('client_id_idx', ['clientId'], { unique: true })
export class Instance {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('text')
  clientId: string;

  @Column('text')
  userId: string;

  // an instance created on the dashboard will have a user, but manually created instances may not have a web user
  @ManyToOne(() => WebUser, (user) => user.ownedInstances, { nullable: true })
  webUser?: WebUser;

  @OneToOne(() => ClientSecrets, (clientSecrets) => clientSecrets.instance, {
    nullable: true,
  })
  secrets: ClientSecrets;

  @Column('text')
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('int', { nullable: true })
  intents?: number;

  @Column({
    type: 'enum',
    enum: ClientSetupState,
    default: ClientSetupState.INITIAL,
  })
  setupState: ClientSetupState;
}
