import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, DefaultClientData } from './types/client';
import { ClientEvents, REST, Client as djsClient } from 'discord.js';
import { API } from '@discordjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as events from '../events';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EnabledStatus,
  Instance,
} from '../../entities/internal/instance.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import MetricsService from '../../metrics/metrics.service';
import { Cron, CronExpression } from '@nestjs/schedule';

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
export class ClientService implements OnModuleInit {
  private clients: Map<string, Client> = new Map();
  private loadingClients: Map<string, Promise<Client>> = new Map();

  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(Instance)
    private instanceRepository: Repository<Instance>,
    private configService: ConfigService,
    @Inject('DEFAULT_CLIENT')
    private defaultClient: DefaultClientData,
    private metricsService: MetricsService,
  ) {}

  onModuleInit() {
    this.loadInstanceFromData(
      this.defaultClient.clientId,
      this.defaultClient.token,
      this.defaultClient.intents,
      true,
    );
  }

  @Cron(CronExpression.EVERY_MINUTE)
  private reportLoadedInstances() {
    this.metricsService.r.instancesLoaded.set(this.clients.size);
  }

  public async getClient(clientId: string): Promise<Client> {
    this.emitEvent('client.requested', { clientId });

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

  private async loadInstanceFromDb(
    clientId: string,
    login = false,
  ): Promise<Client> {
    const instance = await this.instanceRepository.findOne({
      where: { clientId },
      relations: { secrets: true },
    });

    if (!instance) {
      throw new Error('Instance not found');
    }

    if (instance.enabledStatus !== EnabledStatus.ENABLED) {
      throw new Error('Instance not enabled');
    }

    if (!instance.secrets) {
      throw new Error('Instance secrets not found');
    }

    return this.createClient(
      instance.secrets.token,
      clientId,
      instance.intents ??
        this.configService.get<number>('defaultClient.intents'),
      login,
    );
  }

  public loadInstanceFromData(
    clientId: string,
    token: string,
    intents?: number,
    login = false,
  ): Promise<Client> {
    return this.loadInstanceFromData(
      clientId,
      token,
      intents ?? this.configService.get<number>('defaultClient.intents'),
      login,
    );
  }

  private createClient(
    token: string,
    clientId: string,
    intents: number,
    login = false,
  ) {
    const discordClient = new djsClient({ intents });
    const doLogin = () => {
      this.emitEvent('client.login', { clientId });
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

    this.emitEvent('client.create', { clientId });
    return client;
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
