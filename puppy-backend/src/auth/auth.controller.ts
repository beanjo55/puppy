import { Controller, Get, Post, Redirect, Session } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { SessionData } from '../types/session';

@Controller('auth')
export class AuthController {
  constructor(private oauthService: OauthService) {}

  @Get()
  user(@Session() session: SessionData) {}

  @Post()
  @Redirect('/')
  logout(@Session() session: SessionData) {
    session.userId = undefined;
    session.webUserId = undefined;
  }
}
