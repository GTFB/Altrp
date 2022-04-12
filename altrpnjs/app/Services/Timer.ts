import _ from "lodash";
import {other} from "App/Services/Other";
import Customizer from "App/Models/Customizer";
import app_path from "../../helpers/app_path";
import isProd from "../../helpers/isProd";
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import getNextWeek from "../../helpers/getNextWeek";

export default class Timer {
  name;
  value;
  timeout;
  customizer

  constructor(name: string, value: { time: string|number, type: string }, customizer: Customizer) {
    this.name = name;
    this.value = value;
    this.customizer = customizer;

    if(_.isString(this.value.time)) {
      this.value.time = parseInt(this.value.time)
    }

    this.start()
  }

  getTimeInMilliseconds() {

    const count = Math.abs(this.value.time - 1);

    switch (this.value.type) {
      case "day":
        const oneDay = 86400000;
        const toNextDay = oneDay - new Date().getTime() % oneDay;
        return (oneDay * count) + toNextDay
      case "week":
        return getNextWeek(count)
      default:
        const oneHour = 3600000;
        const toNextHour = oneHour - new Date().getTime() % oneHour;
        return (oneHour * count) + toNextHour
    }
  }

  start() {
    const index = ["day", "week", "hour"].indexOf(this.value.type);
    if(index !== -1) {
      this.timeout = setTimeout(() => this.callCustomizer(), this.getTimeInMilliseconds())
      timers.add(this)
    } else {
      timers.remove(this.name)
    }
  }

  async callCustomizer() {
    const controllerName = app_path(`AltrpControllers/${this.customizer.altrp_model.name}Controller`);

    const ControllerClass = isProd() ? (await require(controllerName)).default
      : (await import(controllerName)).default
    const controller = new ControllerClass()

    if(controller[this.customizer.name]) {
      await controller[this.customizer.name](HttpContext)
    } else {
      console.log("customizer name invalid")
    }

    this.timeout = setTimeout(() => this.callCustomizer(), this.getTimeInMilliseconds())
  }

  stop() {
    clearTimeout(this.timeout)
  }
}

class Timers {
  timers: {
    [n: string]: Timer
  } = {}

  stop(name) {
    if(this.timers[name]) {
      this.timers[name].stop()
      delete this.timers[name]
    }
  }

  add(timer: Timer) {
    this.timers[timer.name] = timer

    const timerValue = other.get("timers", {});

    timerValue[timer.name] = timer.value;

    other.update("timers", timerValue)
  }

  remove(name) {
    this.stop(name.name);

    const timerValue = other.get("timers", {});

    delete timerValue[name]

    other.update("timers", timerValue)
  }
}

export const timers = new Timers()
