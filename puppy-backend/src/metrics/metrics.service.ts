import { Injectable, Logger } from '@nestjs/common';
import initMetrics from './metrics.variables';

const metrics = initMetrics();

@Injectable()
export default class MetricsService {
  public r = metrics;
  private readonly logger = new Logger(MetricsService.name);
  constructor() {
    this.logger.debug('Started new instance of MetricsService');
  }
}
