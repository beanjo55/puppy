import {
  CommandArgType,
  SubcommandArgOptions,
} from '../types/CommandArgs.types';

export function SubcommandArg(
  type: CommandArgType.Subcommand | CommandArgType.SubcommandGroup,
  options: SubcommandArgOptions,
): MethodDecorator {
  return function (target: any, propertyKey: string) {};
}
