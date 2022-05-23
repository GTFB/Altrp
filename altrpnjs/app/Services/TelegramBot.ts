import Env from "@ioc:Adonis/Core/Env";
import {Telegraf} from "telegraf";
import User from "App/Models/User";

export class TelegramBot {
  token
  bot
  started = false

  constructor(token) {
    this.token = token

    if(this.token) {
      console.log(this.bot)
      try {
        this.bot = new Telegraf(this.token)
        this.bot.launch()
      } catch (e) {

      }

      this.run()
    }
  }

  run() {
    try {
      if(!this.started) {

        this.bot.start((ctx) => {
          const id = ctx.message.chat.id;
          const username = ctx.message.from.username;

          User.query().where("telegram_user_id", username).orWhere("telegram_user_id", "@" + username).firstOrFail().then((user) => {
            user.telegram_chat = id;
            user.save()
          })
        })
        this.started = true
      }

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

  getData(block) {
    switch (block.type) {
      case "content":
        return block.data.text
      case "photo":
      case "file":
      case "document":
      case "video":
      case "link":
        return block.data.url
    }
  }

  sendByType(block, user) {
    if(block.listener && block.listener !== "none") {
      try {
        switch (block.listener) {
          case "text":
            if(!block.data.listener_value.startsWith("/")) {
              this.bot.hears(block.data.listener_value, (ctx) => {
                ctx.reply(this.getData(block))
              })
            } else {
              this.bot.command(block.data.listener_value, (ctx) => {
                ctx.reply(this.getData(block))
              })
            }
            break
          case "photo":
            this.bot.on("photo", (ctx) => {
              ctx.reply(this.getData(block))
            })
            break
          case "document":
            this.bot.on("document", (ctx) => {
              ctx.reply(this.getData(block))
            })
            break
        }
      } catch (e) {
        console.log(e)
      }
    } else {
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
}

export default new TelegramBot(Env.get("ALTRP_SETTING_TELEGRAM_BOT_TOKEN"))
