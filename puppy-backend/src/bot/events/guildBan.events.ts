import { GuildBan } from 'discord.js';

export class GuildBanAdd {
  public static readonly eventName = 'guild.ban.add';
  constructor(public ban: GuildBan) {}
}

export class GuildBanRemove {
  public static readonly eventName = 'guild.ban.remove';
  constructor(public ban: GuildBan) {}
}
