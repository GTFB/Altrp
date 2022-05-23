export default function JSONStringifyEscape(data:any):string{

  return  (JSON.stringify(data) || 'undefined').replace(/\//g, '\\/')
}
