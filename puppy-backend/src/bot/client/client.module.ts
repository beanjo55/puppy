import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DefaultClientData } from './types/client';

const defaultClientProvider = {
  provide: 'DEFAULT_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      clientId: configService.get<string>('defaultClient.clientId'),
      token: configService.get<string>('defaultClient.token'),
      intents: configService.get<number>('defaultClient.intents'),
    } as DefaultClientData;
  },
};

@Module({
  providers: [defaultClientProvider],
})
export class ClientModule {}
