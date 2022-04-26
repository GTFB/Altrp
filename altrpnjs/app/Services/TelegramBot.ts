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

  run() {
    try {
      this.bot = new Telegraf(this.token)

      this.bot.start((ctx) => {
        const id = ctx.message.chat.id;
        const username = ctx.message.from.username;

        User.query().where("telegram_user_id", username).orWhere("telegram_user_id", "@" + username).firstOrFail().then((user) => {
          user.telegram_chat = id;
          user.save()
        })
      })

      this.bot.launch()
    } catch (e) {
      console.log(e)
    }
  }

  send(blocks, user) {
    if(this.bot) {
      blocks.forEach(block => {
        if(user.telegram_chat) {
          this.sendByType(block, user)
        }
      })
    } else {
      console.log("Telegram bot is null")
    }
  }

  sendByType(block, user) {
    console.log(block)
    try {
      switch (block.type) {
        case "content":
          this.bot.telegram.sendMessage(user.telegram_chat, block.data.text)
          break
        case "photo":
        case "file":
        case "document":
        case "video":
        case "link":
          this.bot.telegram.sendMessage(user.telegram_chat, block.data.url)
          break
      }
    } catch (e) {
      console.log(e)
    }

  }
}

export default new TelegramBot(Env.get("ALTRP_SETTING_TELEGRAM_BOT_TOKEN"))
