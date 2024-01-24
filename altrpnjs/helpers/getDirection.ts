import LANG_OPTIONS from "./const/LANG_OPTIONS";

export default function  getDirection(lang: string){
  if(! lang){
    return 'ltr'
  }

  const langObject = LANG_OPTIONS.find(o=>o.value === lang)
  if(! langObject){
    return  'ltr'
  }

  // @ts-ignore
  return  langObject.direction || 'ltr'
}
