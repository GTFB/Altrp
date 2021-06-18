

export default function mountElements(){
  const elementContainers = document.querySelectorAll('[data-react-element]');
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
    window.ReactDOM.render(<window.Provider store={window.appStore}>
      <window.ElementWrapper {...props} />
    </window.Provider>,  container, ()=>{
      console.log('Load Element:', performance.now());
    })
  })

  loadEmailRenderer();
  loadAdminBar();
  loadGlobalStyles();
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

/**
 * Загрузка отрисовщика email
 */
function loadEmailRenderer(){
  import(/* webpackChunkName: 'EmailTemplatesRenderer' */'../components/EmailTemplatesRenderer').then(module => {
    const EmailTemplatesRenderer = module.default;
    const emailContainer = document.createElement('div');
    document.body.appendChild(emailContainer);
    ReactDOM.render(<window.Provider store={window.appStore}>
      <EmailTemplatesRenderer/>
    </window.Provider>, emailContainer)
  });
}

/**
 * Загрузка отрисовщика email
 */
function loadGlobalStyles(){
  import(/* webpackChunkName: 'EmailTemplatesRenderer' */'../components/GlobalStyles').then(module => {
    const GlobalStyles = module.default;
    const stylesContainer = document.createElement('div');
    document.body.appendChild(stylesContainer);
    ReactDOM.render(<window.Provider store={window.appStore}>
      <GlobalStyles/>
    </window.Provider>, stylesContainer)
  });
}

/**
 * Загрузка админбара
 */
function loadAdminBar() {
  let isAdmin = window.appStore.getState().currentUser.hasRoles(['admin']);
  if(!isAdmin && document.querySelector('.front-app_admin')){
    document.querySelector('.front-app_admin').classList.remove('front-app_admin')
  } else if(isAdmin && ! document.querySelector('.front-app_admin')){
    document.querySelector('.front-app').classList.add('front-app_admin')
  }

  if(document.querySelector('.front-app_admin')) {
    import (/* webpackChunkName: 'AdminBar' */'../components/AdminBar').then(module => {
      const AdminBar = module.default;
      const adminContainer = document.createElement('div');
      document.body.appendChild(adminContainer);
      ReactDOM.render(<AdminBar data={window.current_user || {}} areas={window.page_areas || []} idPage={window.page_id}/>, adminContainer);
    });
  }
}
