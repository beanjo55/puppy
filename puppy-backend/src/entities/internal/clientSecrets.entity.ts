import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Instance } from './instance.entity';
import { EncryptionMode } from 'src/types/encryptionMode';

@Entity()
export class ClientSecrets {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @OneToOne(() => Instance, (instance) => instance.secrets)
  @JoinColumn()
  instance: Instance;

  @Column('text')
  token: string;

  @Column('text')
  clientSecret: string;

  @Column('text')
  clientId: string;

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
