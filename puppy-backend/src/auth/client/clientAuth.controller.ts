import { Controller, Param, Post, Query, Req } from '@nestjs/common';
import { ClientOauthService } from './clientOauth.service';
import { Request } from 'express';

@Controller('auth/client')
export class ClientAuthController {
  constructor(private clientOauthService: ClientOauthService) {}

  @Post('return/:clientId')
  return(
    @Param('clientId') clientId: string,
    @Query('code') code: string,
    @Req() request: Request,
  ) {
    return this.clientOauthService.clientOauthReturn(clientId, code, request);
  }
}
