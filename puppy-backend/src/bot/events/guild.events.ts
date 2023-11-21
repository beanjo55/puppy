import {
  ForumChannel,
  Guild,
  GuildAuditLogsEntry,
  MediaChannel,
  NewsChannel,
  TextChannel,
  VoiceChannel,
} from 'discord.js';

export class GuildCreate {
  public static readonly eventName = 'guild.create';
  constructor(public guild: Guild) {}
}

export class GuildDelete {
  public static readonly eventName = 'guild.delete';
  constructor(public guild: Guild) {}
}

export class GuildUpdate {
  public static readonly eventName = 'guild.update';
  constructor(
    public oldGuild: Guild,
    public newGuild: Guild,
  ) {}
}

export class GuildAvailable {
  public static readonly eventName = 'guild.available';
  constructor(public guild: Guild) {}
}

export class GuildUnavailable {
  public static readonly eventName = 'guild.unavailable';
  constructor(public guild: Guild) {}
}

export class GuildAuditLogEntryCreate {
  public static readonly eventName = 'guild.auditlogentry.create';
  constructor(
    public entry: GuildAuditLogsEntry,
    public guild: Guild,
  ) {}
}

export class GuildIntegrationsUpdate {
  public static readonly eventName = 'guild.integrations.update';
  constructor(public guild: Guild) {}
}

export class WebhooksUpdate {
  public static readonly eventName = 'webhooks.update';
  constructor(
    public channel:
      | TextChannel
      | NewsChannel
      | VoiceChannel
      | ForumChannel
      | MediaChannel,
  ) {}
}

export class ApplicationCommandPermissionUpdate {
  public static readonly eventName = 'applicationcommand.permissionupdate';
  constructor(public data: ApplicationCommandPermissionUpdate) {}
}
