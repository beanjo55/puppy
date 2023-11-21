import { Role } from 'discord.js';

export class RoleCreate {
  public static readonly eventName = 'role.create';
  constructor(public role: Role) {}
}

export class RoleDelete {
  public static readonly eventName = 'role.delete';
  constructor(public role: Role) {}
}

export class RoleUpdate {
  public static readonly eventName = 'role.update';
  constructor(
    public oldRole: Role,
    public newRole: Role,
  ) {}
}
