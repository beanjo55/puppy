/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Guild } from '../models/guild.model';

@Resolver((of) => Guild)
export class GuildResolver {
  constructor() {}

  @Query((returns) => Guild, { name: 'guild' })
  async getGuild(@Args('id', { type: () => String }) id: string) {}

  @ResolveField()
  async roles(@Parent() guild: Guild) {}

  @ResolveField()
  async emojis(@Parent() guild: Guild) {}

  @ResolveField()
  async stickers(@Parent() guild: Guild) {}
}
