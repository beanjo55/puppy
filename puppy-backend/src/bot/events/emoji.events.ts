import { GuildEmoji } from 'discord.js';

export class EmojiCreate {
  public static readonly eventName = 'emoji.create';
  constructor(public emoji: GuildEmoji) {}
}

export class EmojiDelete {
  public static readonly eventName = 'emoji.delete';
  constructor(public emoji: GuildEmoji) {}
}

export class EmojiUpdate {
  public static readonly eventName = 'emoji.update';
  constructor(
    public oldEmoji: GuildEmoji,
    public newEmoji: GuildEmoji,
  ) {}
}
