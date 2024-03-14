import {clearCurrentDataStorage, updateCurrentDatasourceWithDefault} from "../store/current-data-storage/actions";
import {clearElements} from "../store/elements-storage/actions";
import mountElements from "../functions/mount-elements";
import {changeCurrentPage} from "../store/current-page/actions";
import delay from "../functions/delay";
import {changeCurrentModel} from "../store/current-model/actions";
import loadPageActions from "../functions/actions/load-page-actions";
import qs from 'qs'

export default function replacePageContent(url, popstate = false) {

  document.body.style.pointerEvents = 'none'
  if (!url) {
    return
  }
  /**
   * helpers styles
   */
  let helperStyles = document.querySelector('#__helper__styles__')
  if (!helperStyles) {
    helperStyles = document.createElement('style')
    document.head.appendChild(helperStyles)
    helperStyles.innerHTML = `
.app-area__fade-in{
  transition-duration: .3s;
  opacity: 1;
}
.app-area__fade-out{
  transition-duration: .3s;
  opacity: 0;
}
    `
  }


  const progressBar = document.createElement('div')
  progressBar.classList.add('altrp-loading-bar')
  progressBar.style.background = window.altrp_progress_bar_color || 'rgb(48, 79, 253)'
  progressBar.style.boxShadow = 'rgb(0 0 0 / 15%) 0 4px 5px 0px'
  progressBar.style.position = 'fixed'
  progressBar.style.top = 0
  progressBar.style.right = 0
  progressBar.style.left = 0
  progressBar.style.height = '4px'
  progressBar.style.transitionDuration = '100ms'
  progressBar.style.zIndex = 100000
  progressBar.style.transform = 'translate( -100% )'
  delay(100).then(()=>{
    progressBar.style.transform = 'translate( -90%)'
  })
  document.body.appendChild(progressBar)
  if (url.indexOf(location.origin) === 0) {
    url = url.replace(location.origin, '')
  }
  if (url.indexOf(location.host) === 0) {
    url = url.replace(location.host, '')
  }
  // let _url = `/ajax/get-page-content?url=${url}`
  let _url = url
  let xhr = new XMLHttpRequest();


  console.log('async Page Start: ', performance.now());
  xhr.onprogress = function (e) {
    // if (e.lengthComputable) {
    //   let percent = (e.loaded / e.total) * 100;
    //   // progressBar.style.transform = 'translate(' + (90 - percent) + '%)'
    // }
  };
  xhr.open('GET', _url, true);
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.onreadystatechange = async function () {

    if (xhr.readyState === XMLHttpRequest.DONE) {
      if(xhr.getResponseHeader('location')){
        location.href = xhr.getResponseHeader('location')
      }
      if (!xhr.responseText || xhr.status !== 200 && xhr.status !== 404) {
        console.error('Response Error: ' + xhr.responseText)
        location.href = url
        document.body.style.pointerEvents = 'initial'
      }
      try {
        progressBar.style.transform = 'translate( -60%)'
        await _replace(xhr.responseText, popstate ,url, progressBar)
        progressBar.style.transform = 'translate( -5%)'

        console.log('async Page End: ', performance.now());

        const event = new Event('altrp-navigate')
        document.dispatchEvent(event)
        window.dispatchEvent(event)
      } catch (e) {
        console.error(e);
        location.href = url
        document.body.style.pointerEvents = 'initial'
      } finally {
        progressBar.style.transform = 'translate( 0% )'
        await delay(100)
        progressBar.remove()
        document.body.style.pointerEvents = 'initial'
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(e);
    location.href = url
  }
  xhr.send(null);
}

function migrateScript(target, source) {
  const scripts = source.querySelectorAll('script')
  scripts.forEach((s) => {
    const newScript = document.createElement('script')
    if (s.innerHTML) {
      newScript.innerHTML = `(function(){${s.innerHTML}})()`
    } else if (s.getAttribute('src')) {
      newScript.setAttribute('src', s.getAttribute('src'))
    }

    target.appendChild(newScript)
  })
}

async function _replace(htmlString, popstate, url, progressBar) {
  htmlString = htmlString.replace(/<!([\s\S]+?)>/, '')
  const newHtml = document.createElement('html')
  newHtml.innerHTML = htmlString

  /**
   * parsing areas
   */

  const oldAreas = document.querySelectorAll('.app-area');
  const newAreas = newHtml.querySelectorAll('.app-area');
  for (const area of oldAreas) {
    if (!newHtml.querySelector(`.${area.classList.value.replace(/ /g, '.')}`)) {
      _unmountReact(area)
      area.remove()
    }
  }
  let routeContent = document.getElementById('route-content')

  if (!routeContent) {
    routeContent = document.createElement('div')
    routeContent.classList.add('route-content')
    routeContent.setAttribute('id', 'route-content')
    document.querySelector('.front-app').appendChild(routeContent)
  }

  newAreas.forEach((a) => {

    const oldArea = routeContent
      .querySelector(`.${a.classList.value.replace(/ /g, '.')}`)

    if (!oldArea) {
      const newArea = document.createElement('div')
      a.classList.value.split(' ').forEach(c => {
        if (c) {
          newArea.classList.add(c)
        }
      })

      newArea.classList.add('app-area__fade-out')
      delay(300).then(() => {
        newArea.innerHTML = a.innerHTML
        migrateScript(newArea, a)
      })
      routeContent.appendChild(newArea)
      return
    }
    const newSectionWrapper = a.querySelector('.sections-wrapper')

    if (!newSectionWrapper) {
      oldArea.classList.add('app-area__fade-out')
      delay(300).then(() => {
        _unmountReact(oldArea)
        oldArea.innerHTML = ''
        return delay(300)
      })
      return
    }
    if (oldArea.querySelector(`.${newSectionWrapper.classList.value.replace(/ /g, '.')}`)) {
      return;
    }

    oldArea.classList.add('app-area__fade-out')
    delay(300).then(() => {
      _unmountReact(oldArea)
      oldArea.innerHTML = a.innerHTML
      migrateScript(oldArea, a)
    })


  })
  import(/* webpackChunkName: 'add-animation-classes' */'../functions/add-animation-classes').then(module => {
    document.addEventListener('scroll', module.default)
    module.default();
  })
  await delay(300)
  appStore.dispatch(clearCurrentDataStorage())

  /**
   * bar-portal
   */
  document.querySelector('.admin-bar-portal')?.remove()

  /**
   * Area GRid Styles Update
   */

  const newAreasStyles = newHtml.querySelector('#altrp-generated-custom-areas-styles')
  let oldAreasStyles = document.querySelector('#altrp-generated-custom-areas-styles')
  if(newAreasStyles){
    if(! oldAreasStyles){
      oldAreasStyles = document.createElement('style')
      oldAreasStyles.setAttribute('id', 'altrp-generated-custom-areas-styles')
      document.head.appendChild(oldAreasStyles)
    }
    oldAreasStyles.innerHTML = newAreasStyles?.innerHTML
  } else if(oldAreasStyles){
    oldAreasStyles.innerHTML = ''
  }

  /**
   * CSS links
   */

  let links = newHtml.querySelectorAll('link')

  let stylesContainer = document.createElement('div')

  stylesContainer.classList.add('migrated-styles')
  document.body.appendChild(stylesContainer)


  const newStyles = newHtml.querySelectorAll('style:not(#altrp-generated-custom-areas-styles)')
  for (const s of newStyles) {
    stylesContainer.appendChild(s)
  }

  if (!popstate) {
    /**
     * need for back navigation
     */
    window.history.replaceState({
      altrpCustomNavigation: true
    }, '', location.href)
    window.history.pushState({
      altrpCustomNavigation: true
    }, '', url)
  }
  const title = document.querySelector('title')
  const oldTitle = title.innerHTML
  const newTitle = newHtml.querySelector('title')
  title.innerHTML = newTitle.innerHTML

  await Promise.all(_.map(links, l => {
    return new Promise(resolve => {

      const newLink = document.createElement('link')
      newLink.setAttribute('id', l.getAttribute('id'))
      newLink.setAttribute('href', l.getAttribute('href'))
      newLink.setAttribute('rel', 'stylesheet')
      newLink.addEventListener('load', () => {
        resolve()
      })
      newLink.addEventListener('error', () => {
        resolve()
      })
      stylesContainer.appendChild(newLink)
    })
  }))

  document.querySelectorAll('.app-area__fade-out').forEach(e => {

    e.classList.remove('app-area__fade-out')
    e.classList.add('app-area__fade-in')
    delay(300).then(() => {
      e.classList.remove('app-area__fade-in')
    })
  });
  window.scrollTo(0, 0);
  progressBar.style.transform = 'translate( -20%)'

  await delay(300)
  /**
   * scripts move
   */

  const mainScript = newHtml.querySelector('#main-script-altrp')

  let oldMainScript = document.querySelector('#main-script-altrp')
  if (oldMainScript) {
    oldMainScript.remove()
  }
  oldMainScript = document.createElement('script')
  oldMainScript.setAttribute('id', 'main-script-altrp')

  document.body.appendChild(oldMainScript)
  // oldMainScript.innerHTML = `(function(){${mainScript.innerHTML}})()`
  eval(`(function () {
    ${mainScript.innerHTML}
  })()`)
  appStore.dispatch(updateCurrentDatasourceWithDefault())
  //console.log(window.altrpPreloadedDatasources);
  let _allSiteScripts = document.querySelector('#all_site_js')?.innerHTML || ''
  let allSiteScripts = document.querySelector('#all_site_js')
  if (allSiteScripts) {
    allSiteScripts.remove()
  }

  window.popupsContainer?.remove()
  window.popupsContainer = null
  allSiteScripts = document.createElement('script')
  allSiteScripts.setAttribute('id', 'all_site_js')

  document.body.appendChild(allSiteScripts)
  allSiteScripts.innerHTML = `(function(){${_allSiteScripts}})()`
  // const scriptContainer = document.createElement('div')
  // scriptContainer.classList.add('migrated-scripts')
  // document.body.appendChild(scriptContainer)
  // migrateScript(scriptContainer, newHtml)
  formsManager?.clearAll()

  let params = window?.__altrp_settings__?.page_params

  if (!params) {
    params = qs.parse(document?.location?.search.replace('?',''));
  }

  let hashParams = {};
  if (document?.location?.hash && document?.location?.hash.indexOf('=') !== -1) {
    hashParams = qs.parse(document?.location?.hash.replace('#', ''))
  }

  appStore.dispatch(changeCurrentPage({
    url: location?.href || "",
    title: window?.currentPage?.title || "",
    hash: document?.location?.hash,
    pathname:document?.location?.pathname,
    hashParams,
    params,
  }))

  /**
   * Routes updates
   */

  const [
    {changeAppRoutes},
    {default:Route},
  ] = await Promise.all([
      import("../store/routes/actions"),
      import("../classes/Route")
    ],
  )

  let routes = [];
  if(window.altrpPages){
    for (let _data of window.altrpPages) {
      routes.push(Route.routeFabric(_data));
    }
  }

  appStore.dispatch(changeAppRoutes(routes))
  /**
   * Events dispatch
   */

  const event = new Event('DOMContentLoaded')
  const htmlRenderEvent = new Event('html-render')
  delete window.breadcrumbsItems
  document.dispatchEvent(event)
  document.dispatchEvent(htmlRenderEvent)
  window.hAltrp.loadComponents()
  appStore.dispatch(clearElements())
  window.altrpContentLoaded = false

  let defaultModel = {...window.model_data};
  defaultModel.altrpModelUpdated = true
  if (_.isObject(window.route_args)) {
    defaultModel = {
      ...defaultModel,
      ...window.route_args
    }
  }
  appStore.dispatch(changeCurrentModel(defaultModel))

  window.addEventListener('h-altrp-loaded', mountElements);
  window._hAltrp()

  const stylesContainers = document.querySelectorAll('.migrated-styles')
  if (stylesContainers.length > 1) {
    stylesContainers[0].remove()
  }
  const scriptContainers = document.querySelectorAll('.migrated-scripts')
  if (scriptContainers.length > 1) {
    scriptContainers[0].remove()
  }
  window.templateActionsDone = []
  loadPageActions()
  progressBar.style.transform = 'translate( -80%)'
  return {
    newTitle: newTitle.innerHTML,
    oldTitle
  }
}

function _unmountReact(element){
  window.popupsContainer && ReactDOM.unmountComponentAtNode(window.popupsContainer)
  element.querySelectorAll('[data-react-element]').forEach(el=>{
    try {
      ReactDOM.unmountComponentAtNode(el)
    } catch (e) {
      console.error(e);
    }
  })
}
