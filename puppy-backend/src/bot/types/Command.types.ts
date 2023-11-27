export enum CommandType {
  CHAT = 1,
  USER = 2,
  MESSAGE = 3,
}

export interface CommandOptions {
  name: string;
  description: string;
  nameLocalizations?: Record<string, string>;
  descriptionLocalizations?: Record<string, string>;
  nsfw?: boolean;
  dmPermission?: boolean;
  defaultMemberPermissions?: string;
}
