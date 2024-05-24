import loadGlobalStyles from "./load-global-styles";
import findElement from "./findElement";
import {fiFI} from "@material-ui/core/locale";
import React from "react";

export default function mountElements() {
  loadGlobalStyles();
  let elementContainers = document.querySelectorAll('*:not([data-react-element]) [data-react-element]');
  elementContainers = _.filter(elementContainers, container => {
    return !container.parentElement.closest('[data-react-element]')
  })
  _.each(elementContainers, container => {
    // if(container?.dataset?.altrpElement && ALTRP_ELEMENTS[container?.dataset?.altrpElement]){
    //   ALTRP_ELEMENTS[container?.dataset?.altrpElement]().then(Element=>{
    //     new Element.default(container)
    //   })
    //   return;
    // }
    if (!container?.dataset?.reactElement) {
      return;
    }

    let settings = container?.dataset?.altrpSettings
    let informers
    if (settings) {
      settings = altrpHelpers.mbParseJSON(settings, {})

      informers = settings.informers
    }
    const element = findElement(container.dataset.reactElement);
    if (!element) {
      return;
    }

    const props = {
      element,
      elementWrapperRef: {
        current: container
      },
      container,
      withSkeleton: !!container.querySelector('.altrp-element > .altrp-skeleton-box'),
      skeletonItems: container.querySelectorAll('.altrp-element > .altrp-skeleton-box > .altrp-skeleton-box__item').length
    }
    if (informers?.length){
      import(/* webpackChunkName: 'Informer' */'../components/Informer').then(Informer=>{
        Informer = Informer.default
        window.ReactDOM.render(<window.Provider store={window.appStore}>
          <window.ElementWrapper {...props} />
          <div className='altrp-informers'>
            {informers.map((item, idx)=>{
              return <Informer
                {...item}
                key={`informer_${element.getId()}_${idx}`}/>
            })}
          </div>

        </window.Provider>, container, () => {
        })
      })
    } else {
      if(container.hasAttribute('data-altrp-mounted')){
        return;
      }
      container.setAttribute('data-altrp-mounted','')
      window.ReactDOM.render(<window.Provider store={window.appStore}>
        <window.ElementWrapper {...props} />
      </window.Provider>, container, () => {
      })
    }
  })

  import(/* webpackChunkName: 'HAltrp' */'../classes/modules/HAltrp');
  import(/* webpackChunkName: 'section-element-wrapper' */'../libs/section-element-wrapper');
  window.removeEventListener('h-altrp-loaded', mountElements);

}

window.addEventListener('h-altrp-loaded', mountElements);


