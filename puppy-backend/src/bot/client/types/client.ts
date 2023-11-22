import { Client as djsClient } from 'discord.js';
import { API } from '@discordjs/core';

export interface Client {
  api: API;
  clientId: string;
  client: djsClient;
  isLoggedIn: boolean;
  login: () => Promise<string>;
}

export interface DefaultClientData {
  token: string;
  intents: number;
  clientId: string;
}
