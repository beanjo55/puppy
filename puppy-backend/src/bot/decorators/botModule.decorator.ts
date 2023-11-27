import { ModuleOptions } from '../types/Module.types';

export function BotModule(options: ModuleOptions): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata('module', options.name, target);
  };
}
