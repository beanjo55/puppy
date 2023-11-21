import { Snowflake, CloseEvent } from 'discord.js';

export class ShardDisconnect {
  public static readonly eventName = 'shard.disconnect';
  constructor(
    public closeEvent: CloseEvent,
    public shardId: number,
  ) {}
}

export class ShardError {
  public static readonly eventName = 'shard.error';
  constructor(
    public error: Error,
    public shardId: number,
  ) {}
}

export class ShardReady {
  public static readonly eventName = 'shard.ready';
  constructor(
    public shardId: number,
    public unavailableGuilds: Set<Snowflake> | undefined,
  ) {}
}

export class ShardReconnecting {
  public static readonly eventName = 'shard.reconnecting';
  constructor(public shardId: number) {}
}

export class ShardResume {
  public static readonly eventName = 'shard.resume';
  constructor(
    public shardId: number,
    public replayedEvents: number,
  ) {}
}
