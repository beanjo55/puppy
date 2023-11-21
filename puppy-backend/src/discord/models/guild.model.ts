import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from './role.model';
import { Emoji } from './emoji.model';
import { Sticker } from './sticker.model';

@ObjectType({
  description: 'Represents a Discord guild',
})
export class Guild {
  @Field({
    description: "The guild's ID",
  })
  id: string;

  @Field({ description: "The guild's name" })
  name: string;

  @Field({ description: "The guild's icon hash", nullable: true })
  icon?: string;

  @Field({ description: "Discord ID of the guild's owner" })
  ownerId: string;

  @Field(() => [Role], { description: "The guild's roles" })
  roles: Array<Role>;

  @Field(() => [Emoji], { description: "The guild's emojis" })
  emojis: Array<Emoji>;

  @Field(() => [String], { description: "The guild's features" })
  features: Array<string>;

  @Field(() => [Sticker], { description: "The guild's stickers" })
  stickers: Array<Sticker>;
}
