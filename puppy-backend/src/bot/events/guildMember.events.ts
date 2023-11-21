import { GuildMember, PartialGuildMember } from 'discord.js';

export class GuildMemberAdd {
  public static readonly eventName = 'guild.member.add';
  constructor(public member: GuildMember) {}
}

export class GuildMemberAvailable {
  public static readonly eventName = 'guild.member.available';
  constructor(public member: GuildMember | PartialGuildMember) {}

  public isMemberPartial(
    member: GuildMember | PartialGuildMember,
  ): member is PartialGuildMember {
    return member.partial;
  }
}

export class GuildMemberRemove {
  public static readonly eventName = 'guild.member.remove';
  constructor(public member: GuildMember | PartialGuildMember) {}

  public isMemberPartial(
    member: GuildMember | PartialGuildMember,
  ): member is PartialGuildMember {
    return member.partial;
  }
}

export class GuildMemberUpdate {
  public static readonly eventName = 'guild.member.update';
  constructor(
    public oldMember: GuildMember | PartialGuildMember,
    public newMember: GuildMember,
  ) {}

  public isMemberPartial(
    member: GuildMember | PartialGuildMember,
  ): member is PartialGuildMember {
    return member.partial;
  }
}
