import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Represents a custom emoji on Discord',
})
export class Emoji {
  @Field({ description: "The emoji's ID" })
  id: string;

  @Field({ description: "The emoji's name" })
  name: string;

  @Field(() => [String], {
    description: 'Roles allowed to use the emoji',
    nullable: true,
  })
  roles: Array<string>;

  @Field({
    description: 'If the emoji is managed by an integration',
    nullable: true,
  })
  managed?: boolean;

  @Field({ description: 'If the emoji is animated', nullable: true })
  animated?: boolean;

  @Field({ description: 'If the emoji is available', nullable: true })
  available?: boolean;
}
