/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Emoji } from '../models/emoji.model';

@Resolver((of) => Emoji)
export class EmojiResolver {
  constructor() {}

  @Query((returns) => Emoji, { name: 'emoji' })
  async getEmoji(
    @Args('id', { type: () => String }) id: string,
    @Args('guildId', { type: () => String }) guildId: string,
  ) {}

  @Query((returns) => [Emoji], { name: 'emojis' })
  async getEmojis(@Args('guildId', { type: () => String }) guildId: string) {}
}
