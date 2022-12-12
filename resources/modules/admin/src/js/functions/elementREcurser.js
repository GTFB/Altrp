export default function elementREcurser(element){
  for(let s in element.settings){
    if(element.settings.hasOwnProperty(s)){
      if(element.settings[s].hasOwnProperty('url')){
        console.log('Element: ', element.name);
        console.log('setting name: ', s);
      }
    }
  }
  if(element.children){
    element.children?.forEach(c=>{
      elementREcurser(c)
    })
  }
}
