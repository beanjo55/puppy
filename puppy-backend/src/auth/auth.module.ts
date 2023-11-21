import { Module, forwardRef } from '@nestjs/common';
import { BasicAuthModule } from './basic/basicAuth.module';
import { ClientAuthModule } from './client/clientAuth.module';
import { AuthController } from './auth.controller';
import { OauthService } from './oauth.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from '../entities/discord/accessToken.entity';
import { WebUser } from '../entities/internal/webUser.entity';

@Module({
  controllers: [AuthController],
  imports: [
    forwardRef(() => BasicAuthModule),
    forwardRef(() => ClientAuthModule),
    HttpModule,
    TypeOrmModule.forFeature([AccessToken, WebUser]),
  ],
  providers: [OauthService],
  exports: [OauthService],
})
export class AuthModule {}
