import { Injectable } from '@nestjs/common';
import { OauthService } from '../oauth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicOauthService {
  constructor(
    private oauthService: OauthService,
    private configService: ConfigService,
  ) {}

  async oauthReturn(code: string) {
    return this.oauthService.handleReturn(
      code,
      this.configService.get('host') + '/auth/basic/return',
      this.configService.get('defaultClient.clientId'),
      this.configService.get('defaultClient.clientSecret'),
    );
  }

  generateBasicOauthUrl(state: string) {
    return (
      'https://discord.com/oauth2/authorize?response_type=code' +
      '&client_id=' +
      this.configService.get('defaultClient.clientId') +
      '&scope=identify' +
      '&state=' +
      state +
      '&redirect_uri=' +
      encodeURIComponent(
        this.configService.get('host') + '/auth/basic/return',
      ) +
      '&prompt=consent'
    );
  }
}
