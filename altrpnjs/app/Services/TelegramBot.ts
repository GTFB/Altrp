import Env from "@ioc:Adonis/Core/Env";
import {Telegraf} from "telegraf";
import User from "App/Models/User";
import Customizer from "App/Models/Customizer";
import app_path from "../../helpers/path/app_path";
import isProd from "../../helpers/isProd";
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

  //@ts-ignore
  constructor(token, webhook, keyboard, updated='', httpContext: null|HttpContextContract=null) {

    if(httpContext) {
      this.httpContext = httpContext
    }

    if(token && webhook) {
      this.token = token
      this.webhook = webhook


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

  static async startBotFromSettings(token?, webhook?, keyboard?, httpContext?, updated?) {
    const envToken =Env.get("ALTRP_SETTING_TELEGRAM_BOT_TOKEN")
    const envWebhook = Env.get("ALTRP_SETTING_TELEGRAM_BOT_WEBHOOK")
    // const envKeyboard = get_altrp_setting("telegram_bot_keyboard", "", true)

    token = token || envToken;
    webhook = webhook || envWebhook;

    if(updated) {
      new TelegramBot(token, webhook, keyboard, updated, httpContext)
    }
  }

  async init(updated) {
    console.log("init")

    const customizer = await Customizer.query().where("guid", this.webhook).preload("altrp_model").first()

    if(customizer) {
      const controllerName = app_path(`AltrpControllers/${customizer.altrp_model.name}Controller`);

      const ControllerClass = isProd() ? (await require(controllerName)).default
        : (await import(controllerName)).default
      const controller = new ControllerClass()

      if(controller[customizer.name]) {
        this.customizerHttpContext = HttpContext;

        controller.sendNotification = async function () {}

        this.customizerHttpContext.ctx = {
          reply() {}
        }

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

      if(global.telegramBot && updated) {
        if (global.telegramBot.polling !== undefined || global.telegramBot.webhookServer !== undefined) {
          await global.telegramBot.stop()
        }

        global.telegramBot = null
      }

      try {


        global.telegramBot = new Telegraf(this.token, )

        global.telegramBot.use(async (ctx, next) => {

          const controllerName = app_path(`AltrpControllers/${customizer.altrp_model.name}Controller`);

          const ControllerClass = isProd() ? (await require(controllerName)).default
            : (await import(controllerName)).default
          const controller = new ControllerClass()

          const user = await User.query().where("telegram_chat", ctx.message.chat.id).first()

          this.customizerHttpContext.auth = {
            user
          }

          await next();
          this.customizerHttpContext.ctx = ctx;
          await controller[customizer.name](this.customizerHttpContext);

        });

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


}

export default new TelegramBot(Env.get("ALTRP_SETTING_TELEGRAM_BOT_TOKEN"), Env.get("ALTRP_SETTING_TELEGRAM_BOT_WEBHOOK"), get_altrp_setting("telegram_bot_keyboard", "", true), "", null)
