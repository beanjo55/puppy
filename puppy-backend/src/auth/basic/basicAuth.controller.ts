import {
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Session,
} from '@nestjs/common';
import { BasicOauthService } from './basicOauth.service';
import { v4 as uuid } from 'uuid';
import { SessionData } from '../../types/session';

@Controller('auth/basic')
export class BasicAuthController {
  constructor(private basicOauthService: BasicOauthService) {}

  @Get('login')
  @Redirect()
  login(@Session() session: SessionData) {
    session.state = encodeURIComponent(uuid());
    return { url: this.basicOauthService.generateBasicOauthUrl(session.state) };
  }

  @Post('return')
  @Redirect()
  async return(@Query('code') code: string, @Session() session: SessionData) {
    try {
      const { webUser } = await this.basicOauthService.oauthReturn(code);

      session.userId = webUser.userId;
      session.webUserId = webUser.uuid;

      return { url: '/account' };
    } catch (err) {
      return { url: '/' };
    }
  }
}
