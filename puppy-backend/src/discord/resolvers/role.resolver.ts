/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Role } from '../models/role.model';

@Resolver(() => Role)
export class RoleResolver {
  constructor() {}

  @Query(() => Role, { name: 'role' })
  async getRole(
    @Args('id', { type: () => String }) id: string,
    @Args('guildId', { type: () => String }) guildId: string,
  ) {}

  @Query(() => [Role], { name: 'roles' })
  async getRoles(@Args('guildId', { type: () => String }) guildId: string) {}
}
