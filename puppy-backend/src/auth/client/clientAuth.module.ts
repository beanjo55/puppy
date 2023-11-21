import { Module, forwardRef } from '@nestjs/common';
import { ClientAuthController } from './clientAuth.controller';
import { ClientOauthService } from './clientOauth.service';
import { AuthModule } from '../auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [ClientAuthController],
  providers: [ClientOauthService],
  exports: [ClientOauthService],
})
export class ClientAuthModule {}
