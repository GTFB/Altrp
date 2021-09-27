console.log('FIRST SCRIPT: ', performance.now());
import loadPageActions from "./js/functions/actions/load-page-actions";
import loadDepends from "./js/functions/load-depends";
import loadFontsManager from "./js/functions/load-fonts";
import  queryString from 'query-string';
import  "./js/functions/mount-elements";
import  './js/libs/react-lodash';
import {setScrollValue} from "./js/store/scroll-position/actions";
import DataGrid from "devextreme/ui/data_grid";
window.Link = 'a';

new DataGrid(document.getElementById('front-app-server'))

function loadDatastorageUpdater(){
  import(/* webpackChunkName: 'DatastorageUpdater' */'./js/classes/modules/DatastorageUpdater').then(module => {
    const dataStorageUpdater = window.dataStorageUpdater;
    dataStorageUpdater.updateCurrent(currentPage?.data_sources || []);
  });
}

/**
 * Рендерим главный компонент после загрузки основных модулей
 */
window.loadingCallback = function loadingCallback() {
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
    window.dispatchEvent(hAltrpLoadedEvent);

    /**
     * Загружаем все действия привязанные к загрузке страницы
     */
    loadPageActions()
  }
}

window.sSr = false;

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
    loadDepends()
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
document.body.addEventListener('click', e =>{
  import(/* webpackChunkName: 'click-actions' */'./js/functions/actions/click-actions').then((module)=>{
    module?.default(e);
  })
})

window.addEventListener('h-altrp-loaded', e =>{
  import(/* webpackChunkName: 'load-sticky' */'./js/functions/load-sticky').then((module)=>{
    module?.default(e);
  })

  if(document.querySelector('[data-enter-animation-type]')){
    import('./js/functions/add-animation-classes').then(module=>{
      document.addEventListener('scroll', module.default)
      module.default();
    })
  }
})
