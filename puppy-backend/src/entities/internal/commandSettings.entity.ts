import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index('guild_command_idx', ['guildId', 'commandName'], { unique: true })
export class CommandSettings {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('text')
  guildId: string;

  @Column('text')
  commandName: string;

  @Column('boolean')
  enabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
