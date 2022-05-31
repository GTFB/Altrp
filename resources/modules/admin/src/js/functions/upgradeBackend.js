import axios from "axios"
import delay from "../../../../front-app/src/js/functions/delay"
import progressBar from "./progressBar";

async function upgradeBackend() {
  const types = [
    'listeners',
    'models',
    'pages',
    'templates',
  ]
  const pages =  (await axios.get('/admin/ajax/pages')).data
  const count = 4 + pages?.length
  let i = 1
  for (let type of types) {
    let ids = ['']
    if (type === 'pages') {
      ids = pages.map(i =>i.id)
    }
    for (let id of ids) {
      try {
        await axios.post('/admin/ajax/update-all-resources', {type, id})
        let progress = i ++ / count
        progressBar(progress)

      } catch (e) {
        console.error(e);
        let serverRestarted = false
        let i = 0
        do {
          ++i
          try {
            await delay(750)
            await axios.get('/ajax/_token')
            serverRestarted = true
          } catch (e) {
            console.error(e);
          }
        } while (!serverRestarted && i < 10)
      }
    }
  }
}

export default upgradeBackend
