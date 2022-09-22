export default function JSONStringifyEscape(data:any, forAttribute: boolean = false):string{

  data =  (JSON.stringify(data) || 'undefined').replace(/\//g, '\\/')
  if(forAttribute){
    data = data.replace(/"/g, '\\"')
  }
  return data
}
