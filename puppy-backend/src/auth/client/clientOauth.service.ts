import { Injectable } from '@nestjs/common';
import { OauthService } from '../oauth.service';
import { Request } from 'express';

@Injectable()
export class ClientOauthService {
  constructor(private oauthService: OauthService) {}

  clientOauthReturn(clientId: string, code: string, req: Request) {}
}
