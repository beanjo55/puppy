import { Controller, Get, Header } from '@nestjs/common';
import * as client from 'prom-client';

@Controller('/metrics')
export default class MetricsController {
  @Get('/')
  @Header('content-type', 'text/plain')
  ingest() {
    return client.register.metrics();
  }
}
