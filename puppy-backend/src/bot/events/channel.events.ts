import {
  DMChannel,
  NonThreadGuildBasedChannel,
  TextBasedChannel,
} from 'discord.js';

export class ChannelCreate {
  public static readonly eventName = 'channel.create';
  constructor(public channel: NonThreadGuildBasedChannel) {}
}

export class ChannelDelete {
  public static readonly eventName = 'channel.delete';
  constructor(public channel: NonThreadGuildBasedChannel | DMChannel) {}
}

export class ChannelUpdate {
  public static readonly eventName = 'channel.update';
  constructor(
    public oldChannel: NonThreadGuildBasedChannel | DMChannel,
    public newChannel: NonThreadGuildBasedChannel | DMChannel,
  ) {}
}

export class ChannelPinsUpdate {
  public static readonly eventName = 'channel.pins.update';
  constructor(
    public channel: TextBasedChannel,
    public time: Date,
  ) {}
}
