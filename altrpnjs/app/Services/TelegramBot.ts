import Env from "@ioc:Adonis/Core/Env";
import {Telegraf, } from "telegraf";
import User from "App/Models/User";
import Customizer from "App/Models/Customizer";
import app_path from "../../helpers/path/app_path";
import isProd from "../../helpers/isProd";
import * as _ from "lodash";

export class TelegramBot {
  token
  bot
  markup = []
  keyboard

  constructor(token) {
    if(!this.token) {
      this.token = token
    }

    console.log("sadsadsa")
  }

  async send(message, user, customizerData) {
    const blocks = message.content

    if(this.token && !this.bot) {
      try {

        this.bot = new Telegraf(this.token)

        await this.bot.launch()

      } catch (e) {

      }
    }
    if(this.bot) {
      for (const block of blocks) {
        if(user.telegram_chat) {
          await this.sendByType(block, user, customizerData)

          if(this.markup.length > 0) {
            this.keyboard = []
            this.keyboard = this.markup.map((block: {
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
          }
        }
      }

      this.bot.start((ctx) => {
        const id = ctx.message.chat.id;
        const username = ctx.message.from.username;

        User.query().where("telegram_user_id", username).orWhere("telegram_user_id", "@" + username).first().then((user) => {
          if(user) {
            user.telegram_chat = id;
            user.save()

            ctx.telegram.sendMessage(ctx.message.chat.id, message.start_text || "start text is null", {
              hide_keyboard: true,
              reply_markup: JSON.stringify({
                keyboard: [
                  this.keyboard || [],
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

    }
  }

  async sendByType(block, user, customizerData) {

    if (block.listener && block.listener !== "none") {
      try {
        switch (block.listener) {
          case "photo":

            this.bot.on("photo", async (ctx) => {
              ctx.reply(await this.getData(block, customizerData, ctx))
            })

            break
          case "document":

            this.bot.on("document", async (ctx) => {
              ctx.reply(await this.getData(block, customizerData, ctx))
            })

            break
          case "button":

            //@ts-ignore
            this.markup.push(block)

          case "text":
            if (!block.data.listener_value.startsWith("/")) {

              this.bot.hears(block.data.listener_value, async (ctx) => {
                ctx.reply(await this.getData(block, customizerData, ctx))
              })

            } else {

              this.bot.command(block.data.listener_value, async (ctx) => {
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

        this.bot.telegram.sendMessage(user.telegram_chat, await this.getData(block, customizerData))
      } catch (e) {
        console.log(e)
      }
    }
  }
}

export default new TelegramBot(Env.get("ALTRP_SETTING_TELEGRAM_BOT_TOKEN"))
