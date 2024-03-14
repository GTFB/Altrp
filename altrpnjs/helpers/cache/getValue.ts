export default async function getValue(prop:string, _default: any = null):Promise<any>{
  if(globalCache.hasOwnProperty(prop)){
    return globalCache[prop]
  }
  return _default
}
