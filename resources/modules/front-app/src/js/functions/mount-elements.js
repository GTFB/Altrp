import loadGlobalStyles from "./load-global-styles";
import findElement from "./findElement";

export default function mountElements(){
  loadGlobalStyles();
  let elementContainers = document.querySelectorAll('*:not([data-react-element]) [data-react-element]');
  elementContainers = _.filter(elementContainers, container =>{
    return !container.parentElement.closest('[data-react-element]')
  })
  _.each(elementContainers, container =>{
    // if(container?.dataset?.altrpElement && ALTRP_ELEMENTS[container?.dataset?.altrpElement]){
    //   ALTRP_ELEMENTS[container?.dataset?.altrpElement]().then(Element=>{
    //     new Element.default(container)
    //   })
    //   return;
    // }
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
      },
      withSkeleton: ! ! container.querySelector('.altrp-element > .altrp-skeleton-box'),
      skeletonItems: container.querySelectorAll('.altrp-element > .altrp-skeleton-box > .altrp-skeleton-box__item').length
    }
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


