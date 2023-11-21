import { Invite } from 'discord.js';

export class InviteCreate {
  public static readonly eventName = 'invite.create';
  constructor(public invite: Invite) {}
}

export class InviteDelete {
  public static readonly eventName = 'invite.delete';
  constructor(public invite: Invite) {}
}
