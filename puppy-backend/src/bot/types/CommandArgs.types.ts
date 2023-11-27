import { ChannelType } from 'discord.js';

export enum CommandArgType {
  Subcommand = 1,
  SubcommandGroup = 2,
  String = 3,
  Integer = 4,
  Boolean = 5,
  User = 6,
  Channel = 7,
  Role = 8,
  Mentionable = 9,
  Number = 10,
  Attachment = 11,
}

export interface BaseCommandArgOptions {
  name: string;
  description: string;
  nameLocalizations?: Record<string, string>;
  descriptionLocalizations?: Record<string, string>;
  required?: boolean;
}

export interface ChoiceableCommandArgOptions<T extends string | number>
  extends BaseCommandArgOptions {
  choices?: Array<Choice<T>>;
}

export interface Choice<T> {
  name: string;
  nameLocalizations?: Record<string, string>;
  value: T;
}

export interface AutocompleteableCommandArgOptions
  extends BaseCommandArgOptions {
  autocomplete?: boolean;
}

export interface ValuableCommandArgOptions
  extends AutocompleteableCommandArgOptions {
  minValue?: number;
  maxValue?: number;
}

export interface LengthableCommandArgOptions
  extends AutocompleteableCommandArgOptions {
  minLength?: number;
  maxLength?: number;
}

export interface ChannelCommandArgOptions extends BaseCommandArgOptions {
  channelTypes: Array<ChannelType>;
}

export interface SubcommandArgOptions extends BaseCommandArgOptions {
  belongsTo?: string;
}
