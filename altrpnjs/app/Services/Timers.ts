import Timer from "App/Models/Timer";

// export default class Timer {
//   name;
//   value;
//   timeout;
//   customizer
//
//   constructor(name: string, value: { time: string|number, type: string }, customizer: Customizer) {
//     this.name = name;
//     this.value = value;
//     this.customizer = customizer;
//
//     if(_.isString(this.value.time)) {
//       this.value.time = parseInt(this.value.time)
//     }
//
//     this.start()
//   }
//
//   getTimeInMilliseconds() {
//
//     const count = Math.abs(this.value.time - 1);
//
//     switch (this.value.type) {
//       case "day":
//         const oneDay = 86400000;
//         const toNextDay = oneDay - new Date().getTime() % oneDay;
//         return (oneDay * count) + toNextDay
//       case "week":
//         return getNextWeek(count)
//       default:
//         const oneHour = 3600000;
//         const toNextHour = oneHour - new Date().getTime() % oneHour;
//         return (oneHour * count) + toNextHour
//     }
//   }
//
//   async start() {
//     const index = ["day", "week", "hour"].indexOf(this.value.type);
//     if(index !== -1) {
//       this.timeout = setTimeout(() => this.callCustomizer(), this.getTimeInMilliseconds())
//       await timers.add(this)
//     } else {
//       await timers.remove(this.name)
//     }
//   }
//
//   async callCustomizer() {
//     const controllerName = app_path(`AltrpControllers/${this.customizer.altrp_model.name}Controller`);
//
//     const ControllerClass = isProd() ? (await require(controllerName)).default
//       : (await import(controllerName)).default
//     const controller = new ControllerClass()
//
//     if(controller[this.customizer.name]) {
//       await controller[this.customizer.name](HttpContext)
//     } else {
//       console.log("customizer name invalid")
//     }
//
//     this.timeout = setTimeout(() => this.callCustomizer(), this.getTimeInMilliseconds())
//   }
//
//   stop() {
//     clearTimeout(this.timeout)
//   }
// }

class Timers {
  timers: {
    [n: string]: Timer
  } = {}

  constructor() {
    Timer.all().then((timersFromDB) => {
      timersFromDB.forEach(elem => {
        this.add(elem)
      })
    })
  }

  stop(name) {
    if(this.timers[name]) {
      // this.timers[name].stop()
      delete this.timers[name]
    }
  }

  add(timer: Timer) {
    // this.timers[timer.name] = timer

    if(this.timers[timer.id]) {
      this.timers[timer.id].stop()
    }

    this.timers[timer.id] = timer

    this.timers[timer.id].start()

    // const timerValue = other.get("timers", {});

    // timerValue[timer.name] = timer.value;

    // other.update("timers", timerValue)
  }

  async remove(value) {
    // this.stop(name.name);
    let id = "";

    for(const timerKey in this.timers) {
      if(this.timers[timerKey].value === value) {
        id = timerKey
      }
    }

    await this.timers[id].delete()

    if(id) {
      delete this.timers[id]
    }

    // const timerValue = other.get("timers", {});

    // delete timerValue[name]

    // other.update("timers", timerValue)
  }
}
const timers = new Timers()

export default timers
