
/**
 *
 * @param {string} elementId
 * @return {FrontElement}
 */
export default function findElement(elementId){
  window.altrpElementsStorage = window.altrpElementsStorage || {};
  if(! page_areas){
    return null;
  }
  let element = null;
  page_areas.forEach(area=>{
    if(! area?.template?.data || element){
      return;
    }
    element = _findElement(area.template.data, elementId);
  })
  if(element){
    element = frontElementsFabric.parseData(element);
  }
  return element;
}

/**
 *
 * @param {{}} data
 * @param {string} elementId
 * @return {FrontElement}
 */
function _findElement(data, elementId){

  if(data.id === elementId){
    return data;
  }
  let result = null;
  if(! data?.children?.length){
    return result;
  }
  data.children.forEach(child=>{
    if(result){
      return;
    }
    result = _findElement(child, elementId)
  });
  return result;
}
