import { AutoModerationActionExecution, AutoModerationRule } from 'discord.js';

export class AutomodActionExecution {
  public static readonly eventName = 'automod.execute';
  constructor(public action: AutoModerationActionExecution) {}
}

export class AutomodRuleCreate {
  public static readonly eventName: 'automod.rule.create';
  constructor(public rule: AutoModerationRule) {}
}

export class AutomodRuleDelete {
  public static readonly eventName: 'automod.rule.delete';
  constructor(public rule: AutoModerationRule) {}
}

export class AutomodRuleUpdate {
  public static readonly eventName: 'automod.rule.update';
  constructor(
    public oldRule: AutoModerationRule | null,
    public newRule: AutoModerationRule,
  ) {}
}
