import { Injectable } from '@nestjs/common';

@Injectable()
export class CommandRegistryService {
  static commands = new Map<string, string>();
  static commandClasses = new Map<string, any>();
}
