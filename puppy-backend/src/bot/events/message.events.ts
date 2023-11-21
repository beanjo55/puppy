import {
  Collection,
  GuildTextBasedChannel,
  Message,
  PartialMessage,
  Snowflake,
} from 'discord.js';

export class MessageCreate {
  public static readonly eventName = 'message.create';
  constructor(public message: Message) {}
}

export class MessageDelete {
  public static readonly eventName = 'message.delete';
  constructor(public message: Message | PartialMessage) {}

  public isMessagePartial(
    message: Message | PartialMessage,
  ): message is PartialMessage {
    return message.partial;
  }
}

export class MessageUpdate {
  public static readonly eventName = 'message.update';
  constructor(
    public oldMessage: Message | PartialMessage,
    public newMessage: Message | PartialMessage,
  ) {}

  public isMessagePartial(
    message: Message | PartialMessage,
  ): message is PartialMessage {
    return message.partial;
  }
}

export class MessageBulkDelete {
  public static readonly eventName = 'message.bulk.delete';
  constructor(
    public messages: Collection<Snowflake, Message | PartialMessage>,
    public channel: GuildTextBasedChannel,
  ) {}

  public isMessagePartial(
    message: Message | PartialMessage,
  ): message is PartialMessage {
    return message.partial;
  }
}
