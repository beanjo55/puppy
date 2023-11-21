import {
  GuildScheduledEvent,
  PartialGuildScheduledEvent,
  User,
} from 'discord.js';

export class GuildScheduledEventCreate {
  public static readonly eventName = 'guild.scheduledevent.create';
  constructor(public guildScheduledEvent: GuildScheduledEvent) {}
}

export class GuildScheduledEventDelete {
  public static readonly eventName = 'guild.scheduledevent.delete';
  constructor(
    public guildScheduledEvent:
      | GuildScheduledEvent
      | PartialGuildScheduledEvent,
  ) {}

  public isEventPartial(
    event: GuildScheduledEvent | PartialGuildScheduledEvent,
  ): event is PartialGuildScheduledEvent {
    return event.partial;
  }
}

export class GuildScheduledEventUpdate {
  public static readonly eventName = 'guild.scheduledevent.update';
  constructor(
    public oldGuildScheduledEvent:
      | GuildScheduledEvent
      | PartialGuildScheduledEvent,
    public newGuildScheduledEvent: GuildScheduledEvent,
  ) {}

  public isEventPartial(
    event: GuildScheduledEvent | PartialGuildScheduledEvent,
  ): event is PartialGuildScheduledEvent {
    return event.partial;
  }
}

export class GuildScheduledEventUserAdd {
  public static readonly eventName = 'guild.scheduledevent.user.add';
  constructor(
    public guildScheduledEvent:
      | GuildScheduledEvent
      | PartialGuildScheduledEvent,
    public user: User,
  ) {}

  public isEventPartial(
    event: GuildScheduledEvent | PartialGuildScheduledEvent,
  ): event is PartialGuildScheduledEvent {
    return event.partial;
  }
}

export class GuildScheduledEventUserRemove {
  public static readonly eventName = 'guild.scheduledevent.user.remove';
  constructor(
    public guildScheduledEvent:
      | GuildScheduledEvent
      | PartialGuildScheduledEvent,
    public user: User,
  ) {}

  public isEventPartial(
    event: GuildScheduledEvent | PartialGuildScheduledEvent,
  ): event is PartialGuildScheduledEvent {
    return event.partial;
  }
}
