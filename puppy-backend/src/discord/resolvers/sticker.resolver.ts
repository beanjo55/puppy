/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Sticker } from '../models/sticker.model';

@Resolver((of) => Sticker)
export class StickerResolver {
  constructor() {}

  @Query((returns) => Sticker)
  async sticker(@Args('id', { type: () => String }) id: string) {}
}
