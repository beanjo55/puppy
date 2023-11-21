import { Injectable } from '@nestjs/common';
import { Client } from './types/client';
import { ClientEvents, REST, Client as djsClient } from 'discord.js';
import { API } from '@discordjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as events from '../events';

const EventNameMap: Record<keyof ClientEvents, keyof typeof events> = {
  applicationCommandPermissionsUpdate: 'ApplicationCommandPermissionUpdate',
  autoModerationActionExecution: 'AutomodActionExecution',
  autoModerationRuleCreate: 'AutomodRuleCreate',
  autoModerationRuleDelete: 'AutomodRuleDelete',
  autoModerationRuleUpdate: 'AutomodRuleUpdate',
  channelCreate: 'ChannelCreate',
  channelDelete: 'ChannelDelete',
  channelUpdate: 'ChannelUpdate',
  channelPinsUpdate: 'ChannelPinsUpdate',
  emojiCreate: 'EmojiCreate',
  emojiDelete: 'EmojiDelete',
  emojiUpdate: 'EmojiUpdate',
  guildBanAdd: 'GuildBanAdd',
  guildBanRemove: 'GuildBanRemove',
  guildCreate: 'GuildCreate',
  guildDelete: 'GuildDelete',
  guildUnavailable: 'GuildUnavailable',
  guildAvailable: 'GuildAvailable',
  guildAuditLogEntryCreate: 'GuildAuditLogEntryCreate',
  webhooksUpdate: 'WebhooksUpdate',
  guildUpdate: 'GuildUpdate',
  guildIntegrationsUpdate: 'GuildIntegrationsUpdate',
  guildMemberAdd: 'GuildMemberAdd',
  guildMemberRemove: 'GuildMemberRemove',
  guildMemberUpdate: 'GuildMemberUpdate',
  guildMemberAvailable: 'GuildMemberAvailable',
  guildScheduledEventCreate: 'GuildScheduledEventCreate',
  guildScheduledEventDelete: 'GuildScheduledEventDelete',
  guildScheduledEventUpdate: 'GuildScheduledEventUpdate',
  guildScheduledEventUserAdd: 'GuildScheduledEventUserAdd',
  guildScheduledEventUserRemove: 'GuildScheduledEventUserRemove',
  inviteCreate: 'InviteCreate',
  inviteDelete: 'InviteDelete',
  messageCreate: 'MessageCreate',
  messageDelete: 'MessageDelete',
  messageUpdate: 'MessageUpdate',
  messageDeleteBulk: 'MessageBulkDelete',
  presenceUpdate: 'PresenceUpdate',
  typingStart: 'TypingStart',
  userUpdate: 'UserUpdate',
  ready: 'Ready',
  cacheSweep: 'CacheSweep',
  debug: 'Debug',
  error: 'ErrorEvent',
  guildMembersChunk: 'GuildMembersChunk',
  invalidated: 'Invalidated',
  voiceStateUpdate: 'VoiceStateUpdate',
  roleCreate: 'RoleCreate',
  roleDelete: 'RoleDelete',
  roleUpdate: 'RoleUpdate',
  messageReactionAdd: 'ReactionAdd',
  messageReactionRemove: 'ReactionRemove',
  messageReactionRemoveEmoji: 'ReactionRemoveEmoji',
  messageReactionRemoveAll: 'ReactionRemoveAll',
  shardDisconnect: 'ShardDisconnect',
  shardError: 'ShardError',
  shardReady: 'ShardReady',
  shardReconnecting: 'ShardReconnecting',
  shardResume: 'ShardResume',
  stickerCreate: 'StickerCreate',
  stickerDelete: 'StickerDelete',
  stickerUpdate: 'StickerUpdate',
  threadCreate: 'ThreadCreate',
  threadDelete: 'ThreadDelete',
  threadUpdate: 'ThreadUpdate',
  threadListSync: 'ThreadListSync',
  threadMembersUpdate: 'ThreadMembersUpdate',
  threadMemberUpdate: 'ThreadMemberUpdate',
  warn: 'WarnEvent',
  //type satisfaction
  webhookUpdate: 'NullEvent',
  interactionCreate: 'NullEvent',
  stageInstanceCreate: 'NullEvent',
  stageInstanceUpdate: 'NullEvent',
  stageInstanceDelete: 'NullEvent',
};

@Injectable()
export class ClientService {
  private clients: Map<string, Client> = new Map();
  private loadingClients: Map<string, Promise<Client>> = new Map();

  constructor(private eventEmitter: EventEmitter2) {}

  public async getClient(clientId: string): Promise<Client> {
    const client = this.clients.get(clientId);
    if (client) {
      return client;
    }

    const loadingClient = this.loadingClients.get(clientId);
    if (loadingClient) {
      return loadingClient;
    }

    const loader = new Promise<Client>((res, rej) => {
      this.loadInstanceFromDb(clientId).then(res, rej);
    });
    this.loadingClients.set(clientId, loader);
    loader.finally(() => this.loadingClients.delete(clientId));
    return loader;
  }

  private loadInstanceFromDb(clientId: string): Promise<Client> {}

  private createClient(
    token: string,
    clientId: string,
    intents: number,
    login = false,
  ) {
    const discordClient = new djsClient({ intents });
    const doLogin = () => {
      return discordClient.login();
    };
    const client: Client = {
      api: new API(new REST({ version: '10' }).setToken(token)),
      clientId,
      client: discordClient,
      isLoggedIn: login,
      login: doLogin,
    };

    this.clients.set(clientId, client);
    this.registerEventHandlers(client);

    if (login) {
      doLogin();
    }
  }

  private registerEventHandlers(client: Client) {
    const { client: discordClient } = client;

    for (const [eventName, handlerName] of Object.entries(EventNameMap)) {
      if (handlerName === 'NullEvent') {
        continue;
      }

      discordClient.on(eventName, (...args) => {
        this.emitEvent(
          events[handlerName].eventName,
          // "union too complex to compute"
          new (events[handlerName] as any)(...args),
        );
      });
    }
  }

  private emitEvent<T>(event: string, payload: T) {
    this.eventEmitter.emit(event, payload);
  }
}
