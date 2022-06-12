import Customizer from "App/Models/Customizer";
import Model from "App/Models/Model";

class Timers {
  timers: {
    [n: string]: Customizer
  } = {}

  constructor() {
    Customizer.query().whereNotNull("time").then( async (timersFromDB: Customizer[]) => {
      for (const elem of timersFromDB) {
        //@ts-ignore
        const val = await elem.related("altrp_model").query().firstOrFail()

        this.add(elem, val)
      }
    })
  }

  stop(name) {
    if(this.timers[name]) {
      // this.timers[name].stop()
      delete this.timers[name]
    }
  }

  add(timer: Customizer, model: Model) {
    // this.timers[timer.name] = timer

    if(this.timers[timer.id]) {
      this.timers[timer.id].stop()
    }

    this.timers[timer.id] = timer

    this.timers[timer.id].start(model)

    // const timerValue = other.get("timers", {});

    // timerValue[timer.name] = timer.value;

    // other.update("timers", timerValue)
  }

  async remove(removeId) {
    // this.stop(name.name);
    let id = "";

    for(const timerKey in this.timers) {
      if(this.timers[timerKey].id === removeId) {
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
