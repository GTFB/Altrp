import { DateTime } from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
//import timers from "App/Services/Timers";
import getNextWeek from "../../helpers/getNextWeek";
import Customizer from "App/Models/Customizer";
import isProd from "../../helpers/isProd";
import app_path from "../../helpers/path/app_path";
import HttpContext from "@ioc:Adonis/Core/HttpContext";
import { setTimeout, clearTimeout } from "node:timers"

export default class Timer extends BaseModel {
  public static table = 'altrp_timers'

  timeout

  constructor() {
    super()

    this.timeoutSwitch = this.timeoutSwitch.bind(this)
  }


  @column({ isPrimary: true })
  public id: number

  @column()
  public value: string

  @column()
  public type: string

  @column()
  public time: number

  @column()
  public time_type: string

  public static async createWithCheck(data) {
    let timer = await Timer.query().where("value", data.value).first()

    if(timer) {
      await timer.merge(data).save()

    } else {
      timer = await Timer.create(data)
    }
    // await timers.add(timer)
  }

  public getTimeInMilliseconds() {

    const count = Math.abs(this.time - 1);

    switch (this.time_type) {
      case "day":
        const oneDay = 86400000;
        const toNextDay = oneDay - new Date().getTime() % oneDay;
        return (oneDay * count) + toNextDay
      case "week":
        return getNextWeek(count)
      case "minute":
        const oneMinute = 60000;
        const toNextMinute = oneMinute - new Date().getTime() % oneMinute;
        return (oneMinute * count) + toNextMinute
      default:
        const oneHour = 3600000;
        const toNextHour = oneHour - new Date().getTime() % oneHour;
        return (oneHour * count) + toNextHour
    }
  }

  async start() {
    this.timeout = setTimeout(this.timeoutSwitch, this.getTimeInMilliseconds())

  }

  stop() {
    clearTimeout(this.timeout)
  }

  timeoutSwitch() {
    switch (this.type) {
      case "customizer":
        this.callCustomizer()
        break
    }
  }

  async callCustomizer() {
    const customizer = await Customizer.query().where("guid", this.value).preload("altrp_model").firstOrFail()

    const controllerName = app_path(`AltrpControllers/${customizer.altrp_model.name}Controller`);

    const ControllerClass = isProd() ? (await require(controllerName)).default
      : (await import(controllerName)).default
    const controller = new ControllerClass()

    if(controller[customizer.name]) {
      await controller[customizer.name](HttpContext)
    } else {
      console.log("customizer name invalid")
    }

    this.timeout = setTimeout(() => this.callCustomizer(), this.getTimeInMilliseconds())
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
