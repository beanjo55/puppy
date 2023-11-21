import { Module, forwardRef } from '@nestjs/common';
import { BasicAuthController } from './basicAuth.controller';
import { BasicOauthService } from './basicOauth.service';
import { AuthModule } from '../auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [BasicAuthController],
  providers: [BasicOauthService],
  exports: [BasicOauthService],
})
export class BasicAuthModule {}
