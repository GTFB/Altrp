import axios from "axios"
import delay from "../../../../front-app/src/js/functions/delay"
import progressBar from "./progressBar";

const defaultTypes = [
  'listeners',
  'models',
  'pages',
  'templates',
]

async function upgradeBackend(types = defaultTypes, ids ) {

  progressBar(.001)
  let pages = ['']
  if(types.indexOf('pages') > -1){
    pages = (await axios.get('/admin/ajax/pages')).data
  }
  let templates = ['']
  if(types.indexOf('templates') > -1) {
    try {
      templates = (await axios.get('/admin/ajax/templates/getAllIds')).data?.data
    } catch (e) {
      templates = ['']
    }
  }
  const delta = 3
  let count = types.filter(t=> ['pages', 'templates'].indexOf(t) === -1).length
  if(ids){
    count += ids.length / 3
  } else {
    count += pages?.length / 3 + templates?.length / 3
  }

  let _i = 1
  for (let type of types) {
    if(! ids){
      switch (type) {
        case 'pages': {
          ids = pages.map(i => i.id)

        }
          break;
        case 'templates': {
          ids = templates.map(i => i.id)
        }
          break;
      }
    }

    if(!_.isArray(ids)){
      ids = ['']
    }
    do{
      let _ids = ids.splice(0,delta)
      _ids = _ids.join(',')

      try {
        await axios.post('/admin/ajax/update-all-resources', {type, id: _ids})
        let progress = _i++ / count
        progressBar(progress)

      } catch (e) {
        console.error(e);
        let progress = _i++ / count
        progressBar(progress)
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
    }while (ids.length)
    ids = null
  }
}

export default upgradeBackend
