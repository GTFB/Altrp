
export default async function clearValue(prop: null|string){
  if(! prop){
    globalCache = {}
    return
  }
  delete globalCache[prop]
}
