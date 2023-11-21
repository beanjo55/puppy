import {
  Client,
  Collection,
  Guild,
  GuildMember,
  PartialUser,
  Presence,
  Snowflake,
  Typing,
  User,
  VoiceState,
} from 'discord.js';

export class PresenceUpdate {
  public static readonly eventName = 'presence.update';
  constructor(
    public oldPresence: Presence | null,
    public newPresence: Presence,
  ) {}
}

export class TypingStart {
  public static readonly eventName = 'typing.start';
  constructor(public typing: Typing) {}
}

export class UserUpdate {
  public static readonly eventName = 'user.update';
  constructor(
    public oldUser: User | PartialUser,
    public newUser: User,
  ) {}
}

export class Ready {
  public static readonly eventName = 'ready';
  constructor(public client: Client<true>) {}
}

export class CacheSweep {
  public static readonly eventName = 'cache.sweep';
  constructor(public message: string) {}
}

export class Debug {
  public static readonly eventName = 'debug';
  constructor(public message: string) {}
}

export class ErrorEvent {
  public static readonly eventName = 'error';
  constructor(public error: Error) {}
}

export class GuildMembersChunk {
  public static readonly eventName = 'guild.members.chunk';
  constructor(
    public members: Collection<Snowflake, GuildMember>,
    public guild: Guild,
    public data: {
      index: number;
      count: number;
      notFound: Array<unknown>;
      nonce?: string;
    },
  ) {}
}

export class Invalidated {
  public static readonly eventName = 'invalidated';
}

export class VoiceStateUpdate {
  public static readonly eventName = 'voice.state.update';
  constructor(
    public oldState: VoiceState,
    public newState: VoiceState,
  ) {}
}

export class WarnEvent {
  public static readonly eventName = 'warn';
  constructor(public message: string) {}
}
