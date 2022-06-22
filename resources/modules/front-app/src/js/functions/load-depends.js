import WIDGETS_DEPENDS from "../constants/WIDGETS_DEPENDS";

window.libsLoaded = [];
window.LIBS = {
  'section-element-wrapper': () => {
    return import(/* webpackChunkName: 'section-element-wrapper' */'../libs/section-element-wrapper').then(res => {
      window.libsLoaded.push('section-element-wrapper')
      console.log('LOAD "section-element-wrapper": ', performance.now());
      return Promise.resolve(res)
    });
  },
  'moment': () => {
    return import(/* webpackChunkName: 'moment' */'../libs/moment').then(res => {
      window.libsLoaded.push('moment')
      console.log('LOAD moment: ', performance.now());
      return Promise.resolve(res)
    });
  },
  'blueprint': () => {
    return import(/* webpackChunkName: 'Blueprint' */'../libs/blueprint').then(res => {
      window.libsLoaded.push('blueprint')
      console.log('LOAD Blueprint: ', performance.now());
      return Promise.resolve(res)
    });
  },
  'template-loader': () => {
    return import(/* webpackChunkName: 'template-loader' */'../libs/template-loader').then(res => {
      window.libsLoaded.push('template-loader')
      console.log('LOAD "template-loader": ', performance.now());
      return Promise.resolve(res)
    });
  },
};

window.libsToLoad = window.libsToLoad || [];
window.__altrp_settings__?.libsToLoad?.forEach(lib=>{
  try{
    libsToLoad.push(LIBS[lib]())
  }catch (e) {
    console.error(`Lib Not Found ${lib}`);
    console.error(e);
  }
})
export default function loadDepends(){
  const _libsNames = [];
  if (window.altrpElementsLists) {
    window.altrpElementsLists.forEach(el => {
      if (WIDGETS_DEPENDS[el] && WIDGETS_DEPENDS[el].length) {
        WIDGETS_DEPENDS[el].forEach(lib => {
          if(_libsNames.indexOf(lib) !== -1){
            return
          }
          if (LIBS[lib]) {
            _libsNames.push(lib)
            libsToLoad.push(LIBS[lib]())
          }
        });
      }
    })
  } else {
    LIBS.forEach(lib => {
      libsToLoad.push(lib())
    })
  }
  Promise.all(window.libsToLoad).then(res => {
    import (/* webpackChunkName: 'FrontElementsManager' */'../classes/FrontElementsManager').then(module => {
      import (/* webpackChunkName: 'FrontElementsFabric' */'../classes/FrontElementsFabric').then(module => {
        console.log('LOAD FrontElementsFabric: ', performance.now());
        window.loadingCallback && window.loadingCallback();
      });
      return window.frontElementsManager.loadComponents();
    }).then(async components => {
      console.log('LOAD FrontElementsManager: ', performance.now());
      window.loadingCallback && window.loadingCallback();
    });
  });
}
