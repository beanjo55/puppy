import {
  Collection,
  Message,
  MessageReaction,
  PartialMessage,
  PartialMessageReaction,
  PartialUser,
  Snowflake,
  User,
} from 'discord.js';

export class ReactionAdd {
  public static readonly eventName = 'reaction.add';
  constructor(
    public reaction: MessageReaction | PartialMessageReaction,
    public user: User | PartialUser,
  ) {}

  public isPartialReaction(
    reaction: MessageReaction | PartialMessageReaction,
  ): reaction is PartialMessageReaction {
    return reaction.partial;
  }

  public isPartialUser(user: User | PartialUser): user is PartialUser {
    return user.partial;
  }
}

export class ReactionRemove {
  public static readonly eventName = 'reaction.remove';
  constructor(
    public reaction: MessageReaction | PartialMessageReaction,
    public user: User | PartialUser,
  ) {}

  public isPartialReaction(
    reaction: MessageReaction | PartialMessageReaction,
  ): reaction is PartialMessageReaction {
    return reaction.partial;
  }

  public isPartialUser(user: User | PartialUser): user is PartialUser {
    return user.partial;
  }
}

export class ReactionRemoveEmoji {
  public static readonly eventName = 'reaction.removeemoji';
  constructor(public reaction: MessageReaction | PartialMessageReaction) {}

  public isPartialReaction(
    reaction: MessageReaction | PartialMessageReaction,
  ): reaction is PartialMessageReaction {
    return reaction.partial;
  }
}

export class ReactionRemoveAll {
  public static readonly eventName = 'reaction.removeall';
  constructor(
    public message: Message | PartialMessage,
    public reactions: Collection<string | Snowflake, MessageReaction>,
  ) {}

  public isPartialMessage(
    message: Message | PartialMessage,
  ): message is PartialMessage {
    return message.partial;
  }
}
