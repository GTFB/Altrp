import delay from "../../../../front-app/src/js/functions/delay";
import Resource from "../../../../editor/src/js/classes/Resource";

export default async function restartAltrp() {

  try {
    await (new Resource({route:'/admin/ajax/restart-altrp'})).post({})

  } catch (e) {
    let serverRestarted = false
    let i = 0
    do {
      ++i
      try {
        await delay(100)
        await (new Resource({route:'/ajax/_token'})).getAll()
        serverRestarted = true
      } catch (e) {
        console.error(e);
      }
    } while (!serverRestarted && i < 100)
  }
}
