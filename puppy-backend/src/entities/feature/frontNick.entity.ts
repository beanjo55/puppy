import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FrontNick {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('text')
  userId: string;

  @Column('text')
  systemId: string;

  @Column({
    type: 'text',
    array: true,
  })
  blacklistedAlters: Array<string>;

  @Column({
    type: 'text',
    array: true,
  })
  enabledGuilds: Array<string>;
}
