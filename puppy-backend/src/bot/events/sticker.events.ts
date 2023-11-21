import { Sticker } from 'discord.js';

export class StickerCreate {
  public static readonly eventName = 'sticker.create';
  constructor(public sticker: Sticker) {}
}

export class StickerDelete {
  public static readonly eventName = 'sticker.delete';
  constructor(public sticker: Sticker) {}
}

export class StickerUpdate {
  public static readonly eventName = 'sticker.update';
  constructor(
    public oldSticker: Sticker,
    public newSticker: Sticker,
  ) {}
}
