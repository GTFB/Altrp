import loadFontsManager from "./js/functions/load-fonts";

console.log('FIRST SCRIPT: ', performance.now());
import  queryString from 'query-string';
import WIDGETS_DEPENDS from "./js/constants/WIDGETS_DEPENDS";
import  "./js/functions/mount-elements";
import  './js/libs/react-lodash';
import {setScrollValue} from "./js/store/scroll-position/actions";

window.Link = 'a';


function loadDatastorageUpdater(){
  import(/* webpackChunkName: 'DatastorageUpdater' */'./js/classes/modules/DatastorageUpdater').then(module => {
    const dataStorageUpdater = window.dataStorageUpdater;
    dataStorageUpdater.updateCurrent(currentPage?.data_sources || []);
  });
}

/**
 * Рендерим главный компонент после загрузки основных модулей
 */
function loadingCallback() {
  if (window.React
    && window.Component
    && window.ReactDOM
    && window.frontElementsFabric
    && window.frontElementsManager
    && window.frontElementsManager.componentsIsLoaded()
    && window.elementDecorator
    && window.ElementWrapper
    // && window.formsManager
    && window.altrpHelpers
    && window.altrpHelpers.replaceContentWithData
    && window.appStore
    && window._
    /**
     * Проверим подгрузку необходимых библиотек
     */
    && (window.altrpElementsLists &&
      (window.libsToLoad.length
        === window.libsLoaded.length))
  ) {
    console.log('h-altrp LOADED: ', performance.now());

    const hAltrpLoadedEvent = new Event('h-altrp-loaded');
    window.dispatchEvent(hAltrpLoadedEvent);  }
}

window.sSr = false;
window.libsLoaded = [];
window.LIBS = {
  'blueprint': () => {
    return import(/* webpackChunkName: 'Blueprint' */'./js/libs/blueprint').then(res => {
      window.libsLoaded.push('blueprint')
      console.log('LOAD Blueprint: ', performance.now());
      return Promise.resolve(res)
    });
  },
  'moment': () => {
    return import(/* webpackChunkName: 'moment' */'./js/libs/moment').then(res => {
      window.libsLoaded.push('moment')
      console.log('LOAD moment: ', performance.now());
      return Promise.resolve(res)
    });
  },
  'blueprint-select': () => {
    return import(/* webpackChunkName: 'blueprint-select' */'./js/libs/blueprint-select').then(res => {
      window.libsLoaded.push('blueprint-select')
      console.log('LOAD blueprint-select: ', performance.now());
      return Promise.resolve(res)
    });
  },
  'ckeditor': () => {
    return import(/* webpackChunkName: 'ckeditor' */'./js/libs/ckeditor').then(res => {
      window.libsLoaded.push('ckeditor')
      console.log('LOAD ckeditor: ', performance.now());
      return Promise.resolve(res)
    });
  },
  'section-element-wrapper': () => {
    return import(/* webpackChunkName: 'section-element-wrapper' */'./js/libs/section-element-wrapper').then(res => {
      window.libsLoaded.push('section-element-wrapper')
      console.log('LOAD "section-element-wrapper": ', performance.now());
      return Promise.resolve(res)
    });
  },

};

window.libsToLoad = window.libsToLoad || [];
__altrp_settings__.libsToLoad?.forEach(lib=>{
  libsToLoad.push(LIBS[lib]())
})
function loadLibs(){
  if (window.altrpElementsLists) {
    window.altrpElementsLists.forEach(el => {
      if (WIDGETS_DEPENDS[el] && WIDGETS_DEPENDS[el].length && libsToLoad.indexOf(el) === -1) {
        WIDGETS_DEPENDS[el].forEach(lib => {
          if (LIBS[lib]) {
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
  Promise.all(libsToLoad).then(res => {
    import (/* webpackChunkName: 'FrontElementsManager' */'./js/classes/FrontElementsManager').then(module => {
      import (/* webpackChunkName: 'FrontElementsFabric' */'./js/classes/FrontElementsFabric').then(module => {
        console.log('LOAD FrontElementsFabric: ', performance.now());
        loadingCallback();
      });
      return window.frontElementsManager.loadComponents();
    }).then(async components => {
      console.log('LOAD FrontElementsManager: ', performance.now());
      loadingCallback();
    });
  });
}

/**
 * Параллельно загружаем все необходимые модули
 */

import(/* webpackChunkName: 'altrp' */'./js/libs/altrp').then(module => {
  window.currentRouterMatch = new window.AltrpModel({
    params:queryString.parseUrl(window.location.href).query
  });
  import (/* webpackChunkName: 'appStore' */'./js/store/store').then(module => {
    console.log('LOAD appStore: ', performance.now());
    loadingCallback();
    loadDatastorageUpdater();
    loadFontsManager();
    loadLibs()
  });

  import (/* webpackChunkName: 'SimpleElementWrapper' */'./js/components/SimpleElementWrapper').then(module => {
    window.ElementWrapper = module.default;
    console.log('LOAD SimpleElementWrapper: ', performance.now());
    loadingCallback();
  });

  import (/* webpackChunkName: 'elementDecorator' */'./js/decorators/front-element-component').then(module => {
    window.elementDecorator = module.default;
    console.log('LOAD elementDecorator: ', performance.now());
    loadingCallback();
  });
  console.log('LOAD altrp: ', performance.now());
})


import (/* webpackChunkName: 'FormsManager' */'../../editor/src/js/classes/modules/FormsManager.js').then(module => {
  console.log('LOAD FormsManager: ', performance.now());
});

window.stylesModulePromise = new Promise(function (resolve) {
  window.stylesModuleResolve = resolve;
});

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log(
    '%cWelcome to Altrp Front App',
    'color: blue; font-size: 24px; font-weight: 900;'
  );
}

import(/* webpackChunkName: 'IconsManager' */'../../editor/src/js/classes/modules/IconsManager').then(
  IconsManager => {
    console.log('LOAD IconsManager: ', performance.now());
    window.iconsManager = new IconsManager.default();
  }
);
(async function () {

  let _token = await fetch('/ajax/_token', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok === false) {
      return Promise.reject({res: res.text(), status: res.status});
    }
    return res.json();
  });
  if (_token.success) {
    window._token = _token._token;
  }
})();

/**
 * Регистрируем сервис-воркеры
 */

let filename = '/front-app.sw.js';

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  navigator.serviceWorker.register(filename, {scope: '/'});
}

/**
 * Изменение скролла для загрузки ленивых изображений
 */
const frontAppContainer = document.getElementById('front-app');

frontAppContainer.addEventListener('scroll', e=>{
  appStore && appStore.dispatch(setScrollValue({top: e.target.scrollTop}))
})

