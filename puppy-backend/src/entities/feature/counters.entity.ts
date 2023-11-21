import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Counter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  creatorUserId: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SubCounter, (counter) => counter.counter)
  subcounters: Array<SubCounter>;

  @OneToMany(() => CounterEntry, (entry) => entry.counter)
  counts: Array<CounterEntry>;
}

@Entity()
export class SubCounter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Counter, (counter) => counter.subcounters)
  counter: Counter;

  @OneToMany(() => CounterEntry, (entry) => entry.subcounter)
  counts: Array<CounterEntry>;
}

@Entity()
export class CounterEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text')
  userId: string;

  @ManyToOne(() => Counter, (counter) => counter.counts)
  counter: Counter;

  @ManyToOne(() => SubCounter, (subcounter) => subcounter.counts, {
    nullable: true,
  })
  subcounter: SubCounter;
}
