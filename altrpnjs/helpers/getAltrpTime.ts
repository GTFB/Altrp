import * as luxon from 'luxon'
export default function getAltrpTime(){
  return{
    now: luxon.DateTime.now().toFormat('yyyy-MM-dd'),
    tomorrow: luxon.DateTime.now().plus({days:1}).toFormat('yyyy-MM-dd'),
    yesterday: luxon.DateTime.now().plus({days:-1}).toFormat('yyyy-MM-dd'),
    year: luxon.DateTime.now().year,
  }
}
