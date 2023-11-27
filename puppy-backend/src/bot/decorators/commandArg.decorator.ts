import {
  BaseCommandArgOptions,
  ChannelCommandArgOptions,
  ChoiceableCommandArgOptions,
  CommandArgType,
  LengthableCommandArgOptions,
  ValuableCommandArgOptions,
} from '../types/CommandArgs.types';

export function CommandArg(
  type: CommandArgType.String,
  options: ChoiceableCommandArgOptions<string> | LengthableCommandArgOptions,
): MethodDecorator;

export function CommandArg(
  type: CommandArgType.Integer | CommandArgType.Number,
  options: ChoiceableCommandArgOptions<number> | ValuableCommandArgOptions,
): MethodDecorator;

export function CommandArg(
  type: CommandArgType.Channel,
  options: ChannelCommandArgOptions,
): MethodDecorator;

export function CommandArg(
  type: Exclude<
    CommandArgType,
    CommandArgType.Subcommand | CommandArgType.SubcommandGroup
  >,
  options: BaseCommandArgOptions,
): MethodDecorator {
  return function (target: any, propertyKey: string) {};
}
