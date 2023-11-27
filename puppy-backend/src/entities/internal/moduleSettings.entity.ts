import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index('guild_module_idx', ['guildId', 'moduleName'], { unique: true })
export class ModuleSettings {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('text')
  guildId: string;

  @Column('text')
  moduleName: string;

  @Column('boolean')
  enabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
