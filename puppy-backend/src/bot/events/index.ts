export * from './channel.events';
export * from './automod.events';
export * from './emoji.events';
export * from './guild.events';
export * from './guildBan.events';
export * from './guildMember.events';
export * from './guildScheduledEvent.events';
export * from './invite.events';
export * from './message.events';
export * from './misc.events';
export * from './reaction.events';
export * from './role.events';
export * from './shard.events';
export * from './sticker.events';
export * from './thread.events';

export class NullEvent {
  public static readonly eventName = 'null';
  constructor() {
    throw new Error('This event should never be used!');
  }
}
