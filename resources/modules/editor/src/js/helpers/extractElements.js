export default function extractElements(rootElement, elements, callback){
  if(!_.isFunction(callback)){
    return elements
  }
  if(! callback(rootElement) && _.isArray(rootElement.children)){
    rootElement.children.forEach(child=>{
      extractElements(child, elements, callback)
    })
  } else {
    elements.push(rootElement)
  }
}
