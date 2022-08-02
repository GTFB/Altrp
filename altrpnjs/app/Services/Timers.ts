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

import Customizer from 'App/Models/Customizer';
import Model from 'App/Models/Model';

class Timers {
  timers: {
    [n: string]: Customizer;
  } = {};

  constructor() {
    Customizer.query()
      .whereNotNull('time')
      .then(async (timersFromDB: Customizer[]) => {
        for (const elem of timersFromDB) {
          //@ts-ignore
          const val = await elem.related('altrp_model').query().firstOrFail();

          this.add(elem, val);
        }
      });
  }

  stop(name) {
    if (this.timers[name]) {
      // this.timers[name].stop()
      delete this.timers[name];
    }
  }

  add(timer: Customizer, model: Model) {
    // this.timers[timer.name] = timer

    if (this.timers[timer.id]) {
      this.timers[timer.id].stop();
    }

    this.timers[timer.id] = timer;

    this.timers[timer.id].start(model);

    // const timerValue = other.get("timers", {});

    // timerValue[timer.name] = timer.value;

    // other.update("timers", timerValue)
  }

  async remove(removeId) {
    // this.stop(name.name);
    let id = '';

    for (const timerKey in this.timers) {
      if (this.timers[timerKey].id === removeId) {
        id = timerKey;
      }
    }

    await this.timers[id].delete();

    if (id) {
      delete this.timers[id];
    }

    // const timerValue = other.get("timers", {});

    // delete timerValue[name]

    // other.update("timers", timerValue)
  }
}
const timers = new Timers();

export default timers;
