import Env from "@ioc:Adonis/Core/Env";
import {Telegraf} from "telegraf";
import User from "App/Models/User";

export class TelegramBot {
  token
  bot

  constructor(token) {
    this.token = token

    if(this.token) this.run()
  }

  // start(ctx) {
  //   // for command /start
  // }
  //
  // help(ctx) {
  //   // for command /help
  // }

  run() {
    this.bot = new Telegraf(this.token)
    this.bot.start((ctx) => {
      const id = ctx.message.chat.id;
      const username = ctx.message.from.username;

      User.query().where("telegram_user_id", username).orWhere("telegram_user_id", "@" + username).firstOrFail().then((user) => {
        user.telegram_chat = id;
        user.save()
      })
    })

    this.bot.help((ctx) => ctx.reply('Send me a sticker'))

    this.bot.launch()
  }
  //@ts-ignore
  send(blocks, user) {
    if(user.telegram_chat) {
      this.bot.telegram.sendMessage(user.telegram_chat, "sadasda")
    }
  }

  add
}

export default new TelegramBot(Env.get("ALTRP_SETTING_TELEGRAM_BOT_TOKEN"))
