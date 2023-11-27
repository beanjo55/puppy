import { Injectable } from '@nestjs/common';

@Injectable()
export class ModuleRegistryService {
  static modules = new Map<string, string>();
  static moduleClasses = new Map<string, any>();
}
