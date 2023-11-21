import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Represents a Discord role',
})
export class Role {
  @Field({ description: "The role's ID" })
  id: string;

  @Field({ description: "The role's name" })
  name: string;

  @Field(() => Int, { description: "The role's color" })
  color: number;

  @Field({
    description: 'If the role is displayed separately in the member list',
  })
  hoist: boolean;

  @Field({
    description: 'The has of the role icon, if present',
    nullable: true,
  })
  icon?: string;

  @Field({
    description: "The unicode emoji for the role's icon, if present",
    nullable: true,
  })
  unicodeEmoji?: string;

  @Field(() => Int, {
    description: "The position of the role in the guild's role list",
  })
  position: number;

  @Field({ description: 'Permission bitfield for the role' })
  permissions: string;

  @Field({ description: 'If the role is managed by Discord or an application' })
  managed: boolean;

  @Field({ description: 'If the role is mentionable by all users' })
  mentionable: string;
}
