import {
  AnyThreadChannel,
  Collection,
  Guild,
  PartialThreadMember,
  Snowflake,
  ThreadMember,
} from 'discord.js';

export class ThreadCreate {
  public static readonly eventName = 'thread.create';
  constructor(
    public thread: AnyThreadChannel,
    public newlyCreated: boolean,
  ) {}
}

export class ThreadDelete {
  public static readonly eventName = 'thread.delete';
  constructor(public thread: AnyThreadChannel) {}
}

export class ThreadUpdate {
  public static readonly eventName = 'thread.update';
  constructor(
    public oldThread: AnyThreadChannel,
    public newThread: AnyThreadChannel,
  ) {}
}

export class ThreadListSync {
  public static readonly eventName = 'thread.listsync';
  constructor(
    public threads: Collection<Snowflake, AnyThreadChannel>,
    public guild: Guild,
  ) {}
}

export class ThreadMembersUpdate {
  public static readonly eventName = 'thread.membersupdate';
  constructor(
    public addedMembers: Collection<Snowflake, ThreadMember>,
    public removedMembers: Collection<
      Snowflake,
      ThreadMember | PartialThreadMember
    >,
    public thread: AnyThreadChannel,
  ) {}
}

export class ThreadMemberUpdate {
  public static readonly eventName = 'thread.memberupdate';
  constructor(
    public oldMember: ThreadMember,
    public newMember: ThreadMember,
  ) {}
}
