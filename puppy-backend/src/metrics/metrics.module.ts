import { Global, Module } from '@nestjs/common';
import MetricsController from './metrics.controller';
import MetricsService from './metrics.service';

@Global()
@Module({
  providers: [MetricsService],
  exports: [MetricsService],
  controllers: [MetricsController],
})
export class MetricsModule {}
