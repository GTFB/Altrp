import Env from '@ioc:Adonis/Core/Env';
import { Client, Intents } from 'discord.js';

export class DiscordBot {
  token;
  bot;

  constructor(token) {
    this.token = token;

    if (this.token) this.run();
  }

  run() {
    try {
      this.bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

      this.bot.login(this.token);
    } catch (e) {
      console.log(e);
    }
  }

  send(blocks) {
    if (this.bot) {
      this.bot.guilds.cache.map((guild) => {
        const channel = guild.channels.cache.get(guild.systemChannelId);

        blocks.forEach((block) => this.sendByType(block, channel));
      });
    } else {
      console.log('Discord bot is null');
    }
  }

  sendByType(block, channel) {
    console.log(block);
    try {
      switch (block.type) {
        case 'message':
          console.log(block.value);
          channel.send(block.value);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new DiscordBot(Env.get('ALTRP_SETTING_DISCORD_BOT_TOKEN'));
