import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum StickerType {
  STANDARD,
  GUILD,
}

registerEnumType(StickerType, {
  name: 'StickerType',
  description: 'The type of sticker',
});

export enum StickerFormatType {
  PNG,
  APNG,
  LOTTIE,
  GIF,
}

registerEnumType(StickerFormatType, {
  name: 'StickerFormatType',
  description: 'The image format of the sticker',
});

@ObjectType({
  description: 'Represents a Discord sticker',
})
export class Sticker {
  @Field({ description: "The sticker's ID" })
  id: string;

  @Field(() => StickerType, { description: "The sticker's type" })
  type: StickerType;

  @Field({ description: "The sticker's name" })
  name: string;

  @Field({ description: "The sticker's description" })
  description: string;

  @Field(() => StickerFormatType, {
    description: "The sticker's image format type",
  })
  formatType: StickerFormatType;

  @Field({ description: 'If the sticker is available to use', nullable: true })
  available?: boolean;

  @Field({ description: "The sticker's guild ID", nullable: true })
  guildId?: string;
}

@ObjectType({
  description: 'Represents a sticker used in a message',
})
export class StickerItem {
  @Field({ description: "The sticker's ID" })
  id: string;

  @Field({ description: "The sticker's name" })
  name: string;

  @Field(() => StickerFormatType, {
    description: "The sticker's image format type",
  })
  formatType: StickerFormatType;
}
