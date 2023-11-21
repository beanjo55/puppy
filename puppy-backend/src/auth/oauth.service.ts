import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from '../entities/discord/accessToken.entity';
import { WebUser } from '../entities/internal/webUser.entity';
import { Repository } from 'typeorm';
import { catchError, lastValueFrom } from 'rxjs';
import {
  AccessTokenResponse,
  AccessTokenResponseData,
} from './types/accessTokenResponse';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { UserResponse, UserResponseData } from './types/userResponse';

@Injectable()
export class OauthService {
  private readonly logger = new Logger(OauthService.name);
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(AccessToken)
    private accessTokenRepository: Repository<AccessToken>,
    @InjectRepository(WebUser)
    private webUserRepository: Repository<WebUser>,
  ) {}

  public async handleReturn(
    code: string,
    redirectUsed: string,
    clientId: string,
    clientSecret: string,
  ) {
    const accessTokenResponse = await this.getTokenFromCode(
      code,
      redirectUsed,
      clientId,
      clientSecret,
    );
    const user = await this.fetchUserFromToken(accessTokenResponse.accessToken);
    const webUser = await this.upsertWebUser(user);
    this.createOrUpdateAccessTokenEntity(
      accessTokenResponse,
      webUser,
      clientId,
    );

    return {
      webUser,
    };
  }

  public async getTokenFromCode(
    code: string,
    redirectUsed: string,
    clientId: string,
    clientSecret: string,
  ) {
    const accessTokenResponse = await lastValueFrom(
      this.httpService
        .post<AccessTokenResponseData>(
          'https://discord/com/api/v10/oauth2/token',
          {
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUsed,
            client_id: clientId,
            client_secret: clientSecret,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
            },
          },
        )
        .pipe(
          catchError((err: AxiosError) => {
            this.logger.error(err);
            throw err;
          }),
        ),
    ).then((res) => {
      return new AccessTokenResponse(res.data);
    });

    return accessTokenResponse;
  }

  private async upsertWebUser(user: UserResponse): Promise<WebUser> {
    await this.webUserRepository.upsert(user, ['userId']);
    return this.webUserRepository.findOneBy({ userId: user.id });
  }

  private async createOrUpdateAccessTokenEntity(
    accessTokenResponse: AccessTokenResponse,
    webUser: WebUser,
    clientId: string,
  ) {
    let newEntity = false;
    let tokenEntity = await this.accessTokenRepository.findOneBy({
      userId: webUser.userId,
      clientId,
    });

    if (!tokenEntity) {
      tokenEntity = new AccessToken();
      newEntity = true;
    }

    tokenEntity = this.createAccessTokenEntity(
      tokenEntity,
      accessTokenResponse,
      webUser,
      clientId,
    );

    if (newEntity) {
      webUser.accessTokens.push(tokenEntity);
    }

    await this.accessTokenRepository.save(tokenEntity);
    await this.webUserRepository.save(webUser);
  }

  private createAccessTokenEntity(
    entity: AccessToken,
    accessTokenResponse: AccessTokenResponse,
    webUser: WebUser,
    clientId: string,
  ): AccessToken {
    entity.accessToken = accessTokenResponse.accessToken;
    entity.tokenType = accessTokenResponse.tokenType;
    entity.refreshToken = accessTokenResponse.refreshToken;
    entity.expiresIn = accessTokenResponse.expiresIn;
    entity.scopes = [accessTokenResponse.scope];
    entity.webUser = webUser;
    entity.clientId = clientId;
    entity.userId = webUser.userId;

    return entity;
  }

  public async fetchUserFromToken(token: string): Promise<UserResponse> {
    return lastValueFrom(
      this.httpService
        .get<UserResponseData>('https://discord.com/api/v10/users/@me', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          catchError((err: AxiosError) => {
            this.logger.error(err);
            throw err;
          }),
        ),
    ).then((res) => {
      return new UserResponse(res.data);
    });
  }
}
