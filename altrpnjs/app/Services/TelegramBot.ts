import Env from "@ioc:Adonis/Core/Env";
import {Telegraf} from "telegraf";
import User from "App/Models/User";
import Customizer from "App/Models/Customizer";
import app_path from "../../helpers/path/app_path";
import isProd from "../../helpers/isProd";
import * as _ from "lodash";
import HttpContext, {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import get_altrp_setting from "../../helpers/get_altrp_setting";

export class TelegramBot {
  token
  webhook
  keyboard
  httpContext
  customizer
  customizerHttpContext
  customizerController
  // markup = []
  // keyboard

  constructor(token, webhook, keyboard, updated='', httpContext: null|HttpContextContract=null) {
    if(httpContext) {
      this.httpContext = httpContext
    }

    if(token && webhook) {
      this.token = token
      this.webhook = webhook
      try {
        console.log(keyboard)
        this.keyboard = JSON.parse(keyboard)
      } catch (e) {
        console.log("keyboard is invalid")
        if(httpContext) {
          httpContext.response.abort("keyboard is invalid")
        }
      }

      this.init(updated).catch(e => {
        console.log(e)
      })
    } else {
      console.log("token or webhookUrl is null")
      if(httpContext) {
        httpContext.response.abort("token or webhookUrl is null")
      }
    }
  }

  static async startBotFromSettings(token?, webhook?, keyboard?, httpContext?) {
    const envToken =Env.get("ALTRP_SETTING_TELEGRAM_BOT_TOKEN")
    const envWebhook = Env.get("ALTRP_SETTING_TELEGRAM_BOT_WEBHOOK")
    const envKeyboard = get_altrp_setting("telegram_bot_keyboard", "", true)

    token = token || envToken;
    webhook = webhook || envWebhook;
    keyboard = keyboard || envKeyboard;

    let updated: null | string = null

    if(token !== envToken) {
      updated = "token"
    } else if (webhook !== envWebhook) {
      updated = "webhook"
    } else if (keyboard !== envKeyboard) {
      updated = "keyboard"
    }

    if(updated) {
      new TelegramBot(token, webhook, keyboard, updated, httpContext)
    }
  }

  async init(updated) {
    console.log("init")

    const webhookSplitted = this.webhook.split("/");

    const customizer = await Customizer.query().where("name", webhookSplitted[webhookSplitted.length-1]).preload("altrp_model").first()

    if(customizer) {
      const controllerName = app_path(`AltrpControllers/${customizer.altrp_model.name}Controller`);

      const ControllerClass = isProd() ? (await require(controllerName)).default
        : (await import(controllerName)).default
      const controller = new ControllerClass()

      if(controller[customizer.name]) {
        this.customizerHttpContext = HttpContext;

        this.customizerHttpContext.message = "message is null"

        this.customizerHttpContext.ctx = {
          reply() {}
        }

        controller.sendNotification = async function () {}

        await controller[customizer.name](this.customizerHttpContext)

        this.customizerController = controller
        this.customizer = controller[customizer.name]
      } else {
        console.log("Customizer not found")
        if(this.httpContext) {
          this.httpContext.response.abort("Customizer not found")
        } else {
          return "Customizer not found"
        }
      }

      if(!this.customizerController.customizerData.message) {
        console.log("Message node not found")
        if(this.httpContext) {
          this.httpContext.response.abort("Message node not found")
        } else {
          return "Message node not found"
        }
      }

      if(global.telegramBot && updated) {
        if (global.telegramBot.polling !== undefined || global.telegramBot.webhookServer !== undefined) {
          console.log(updated)
          await global.telegramBot.stop()
        }

        global.telegramBot = null
      }

      try {
        const message = this.customizerController.customizerData.message;
        const content = JSON.parse(this.customizerController.customizerData.message.content);

        console.log(content)

        global.telegramBot = new Telegraf(this.token)

        global.telegramBot.startWebhook(this.webhook)

        global.telegramBot.start(async (ctx) => {
          const id = ctx.message.chat.id;
          const username = ctx.message.from.username;
          const user = await User.query().where("telegram_user_id", username).orWhere("telegram_user_id", "@" + username).first()

          if(user) {
            user.telegram_chat = id

            user.save()
          }

          ctx.telegram.sendMessage(ctx.message.chat.id, message.start_text || "start text", {
            reply_markup: JSON.stringify(this.keyboard)
          })
        })


        for (const block of content) {
          global.telegramBot.hears(block.listener_value, async (ctx) => {
            this.customizerHttpContext.message = ctx.message.text
            this.customizerHttpContext.ctx = ctx
            const chat = ctx.message.chat.id;

            const user = await User.query().where("telegram_chat", chat).first();

            this.customizerHttpContext.auth = {
              user
            }

            const value = await controller[customizer.name](this.customizerHttpContext);

            console.log(value)
          })
        }

        await global.telegramBot.launch().catch((e) => {
          console.log(e)
          if(this.httpContext) {
            this.httpContext.response.abort(e)
          } else {
            return e
          }
        })
      } catch (e) {
        console.log(e)
        if(this.httpContext) {
          this.httpContext.response.abort(e)
        } else {
          return e
        }
      }
    } else {
      console.log("customizer not found")
      if(this.httpContext) {
        this.httpContext.response.abort("customizer not found")
      } else {
        return "customizer not found"
      }
    }
  }


  async getData(block, customizerData, ctx=null) {
    if(ctx) {
      customizerData.context.ctx = ctx
    }

    switch (block.type) {
      case "content":

        return block.data.text || "message is null (content)"

      case "photo":
      case "file":
      case "document":
      case "video":
      case "link":

        return block.data.url || "message is null (media)"

      case "customizer":
        const customizer = await Customizer.query().where("name", block.data.customizer).preload("altrp_model").firstOrFail();

        if(ctx) {

          //@ts-ignore
          const chat = ctx.message.chat.id;

          const user = await User.query().where("telegram_chat", chat).firstOrFail();

          const httpContext = HttpContext
          console.log(httpContext)
          if(httpContext) {
            //@ts-ignore
            httpContext.auth = {
              user: user
            }

            const controllerName = app_path(`AltrpControllers/${customizer.altrp_model.name}Controller`);

            const ControllerClass = isProd() ? (await require(controllerName)).default
              : (await import(controllerName)).default
            const controller = new ControllerClass()

            // const httpContext = _.get(customizerData, "httpContext");

            if(controller[customizer.name]) {
              const val = await controller[customizer.name](httpContext);

              console.log(val, "customizer")
              return val || "message is null (customizer)"
            } else {
              return "error"
            }
          } else {
            return "httpContext is null"
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

export default new TelegramBot(Env.get("ALTRP_SETTING_TELEGRAM_BOT_TOKEN"), Env.get("ALTRP_SETTING_TELEGRAM_BOT_WEBHOOK"), get_altrp_setting("telegram_bot_keyboard", "", true))
