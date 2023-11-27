import { CommandOptions } from '../types/Command.types';

export function Command(options: CommandOptions): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata('command', options.name, target);
  };
}
