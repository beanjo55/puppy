import {
  Field,
  ObjectType,
  InterfaceType,
  registerEnumType,
} from '@nestjs/graphql';

@InterfaceType({ description: 'Represents a Discord User' })
export abstract class BasicUser {
  @Field({ description: "The user's ID" })
  id: string;

  @Field({ description: "The user's username" })
  username: string;

  @Field({ description: "The user's discriminator" })
  discriminator: string;

  @Field({ description: "The user's avatar hash", nullable: true })
  avatar?: string;
}

@ObjectType({
  description: 'Represents a Discord User',
  implements: () => [BasicUser],
})
export class User implements BasicUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
}

export enum OauthScopes {
  IDENTIFY,
  EMAIL,
  GUILDS,
  GUILDMEMBER,
}

registerEnumType({
  name: 'OauthScopes',
  description: 'The scopes that can be requested from the Discord API',
});

@ObjectType({
  description: 'A logged in Discord user',
  implements: () => [BasicUser],
})
export class OauthUser implements BasicUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;

  @Field(() => [OauthScopes], {
    description: 'The scopes that the user has authorized',
  })
  scopes: Array<OauthScopes>;
}
