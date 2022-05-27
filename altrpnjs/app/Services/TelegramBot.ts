import Env from "@ioc:Adonis/Core/Env";
import {Telegraf, } from "telegraf";
import User from "App/Models/User";
import Customizer from "App/Models/Customizer";
import app_path from "../../helpers/path/app_path";
import isProd from "../../helpers/isProd";
import * as _ from "lodash";

global.telegramMarkup = []
global.telegramKeyboard = []

export class TelegramBot {
  token
  bot
  // markup = []
  // keyboard

  constructor(token) {
    if(!this.token) {
      this.token = token
    }

  }

  async send(message, user, customizerData) {
    const blocks = message.content

    if(this.token && !global.telegramBot) {
      try {

        global.telegramBot = new Telegraf(this.token)

        await global.telegramBot.launch()

      } catch (e) {

      }
    }
    if(global.telegramBot) {
      for (const block of blocks) {
        await this.sendByType(block, user, customizerData)
      }

      global.telegramKeyboard = global.telegramMarkup.map((block: {
        listener_value: string | undefined
      }) => {
        if(block.listener_value) {
          return {
            text: block.listener_value
          }
        } else {
          return {
            text: "Listener value is null"
          }
        }
      })

      global.telegramBot.start((ctx) => {
        const id = ctx.message.chat.id;
        const username = ctx.message.from.username;

        User.query().where("telegram_user_id", username).orWhere("telegram_user_id", "@" + username).first().then((user) => {
          if(user) {
            user.telegram_chat = id;
            user.save()

            ctx.telegram.sendMessage(ctx.message.chat.id, message.start_text || "start text is null", {
              reply_markup: JSON.stringify({
                keyboard: [
                  global.telegramKeyboard
                ],
                resize_keyboard: true
              })
            })

          } else {
            ctx.reply(`${Env.get("APP_URL")}/telegram/login?chat=${ctx.message.chat.id}`)
          }
        })
      })

    } else {
      console.log("Telegram bot is null")
    }
  }

  async getData(block, customizerData, ctx=null) {
    if(ctx) {
      customizerData.context.ctx = ctx
    }

    switch (block.type) {
      case "content":

        return block.data.text || "message is null"

      case "photo":
      case "file":
      case "document":
      case "video":
      case "link":

        return block.data.url || "message is null"

      case "customizer":
        const customizer = await Customizer.query().where("name", block.data.customizer).preload("altrp_model").firstOrFail();

        if(ctx) {
          //@ts-ignore
          const chat = ctx.message.chat.id;

          const user = await User.query().where("telegram_chat", chat).firstOrFail();

          customizerData.context.current_user = user;
          customizerData.current_user = user
          await customizerData.httpContext.auth.use('web').login(user)

          const controllerName = app_path(`AltrpControllers/${customizer.altrp_model.name}Controller`);

          const ControllerClass = isProd() ? (await require(controllerName)).default
            : (await import(controllerName)).default
          const controller = new ControllerClass()

          const httpContext = _.get(customizerData, "httpContext");

          if(controller[customizer.name]) {
            const val = await controller[customizer.name](httpContext);

            return val || "message is null"
          } else {
            return "error"
          }
        } else {
          return "error ctx is null"
        }
    }
  }

  async sendByType(block, user, customizerData) {

    if (block.listener && block.listener !== "none") {
      try {
        switch (block.listener) {
          case "photo":

            global.telegramBot.on("photo", async (ctx) => {
              ctx.reply(await this.getData(block, customizerData, ctx))
            })

            break
          case "document":

            global.telegramBot.on("document", async (ctx) => {
              ctx.reply(await this.getData(block, customizerData, ctx))
            })

            break
          case "button":

            //@ts-ignore
            global.telegramMarkup.push(block)

          case "text":
            if (!block.data.listener_value.startsWith("/")) {

              global.telegramBot.hears(block.data.listener_value, async (ctx) => {
                ctx.reply(await this.getData(block, customizerData, ctx))
              })

            } else {

              global.telegramBot.command(block.data.listener_value, async (ctx) => {
                ctx.reply(await this.getData(block, customizerData, ctx))
              })

            }
            break
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      try {

        global.telegramBot.telegram.sendMessage(user.telegram_chat, await this.getData(block, customizerData))
      } catch (e) {
        console.log(e)
      }
    }
  }
}

export default new TelegramBot(Env.get("ALTRP_SETTING_TELEGRAM_BOT_TOKEN"))
