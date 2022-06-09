import loadGlobalStyles from "./load-global-styles";

export default function mountElements(){
  loadGlobalStyles();
  let elementContainers = document.querySelectorAll('*:not([data-react-element]) [data-react-element]');
  console.log(elementContainers);
  elementContainers = _.filter(elementContainers, container =>{
    return !container.parentElement.closest('[data-react-element]')
  })
  _.each(elementContainers, container =>{
    if(! container?.dataset?.reactElement){
      return;
    }
    const element = findElement(container.dataset.reactElement);
    if(! element){
      return;
    }
    const props = {
      element,
      elementWrapperRef:{
        current: container
      }
    }
    console.log('Loading Element: ', performance.now());
    // console.log(container?.dataset?.reactElement);
    window.ReactDOM.render(<window.Provider store={window.appStore}>
      <window.ElementWrapper {...props} />
    </window.Provider>,  container, ()=>{
      console.log('Load Element:', performance.now());
    })
  })
  import('../classes/modules/HAltrp');
  window.removeEventListener('h-altrp-loaded', mountElements);
}

window.addEventListener('h-altrp-loaded', mountElements);

/**
 *
 * @param {string} elementId
 * @return {FrontElement}
 */
function findElement(elementId){
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

