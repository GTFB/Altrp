import {clearCurrentDataStorage} from "../store/current-data-storage/actions";
import {clearElements} from "../store/elements-storage/actions";
import mountElements from "../functions/mount-elements";
import {changeCurrentPage} from "../store/current-page/actions";
import convertQueryParamsToObject from "../functions/convert-query-params-to-object";

export default function replacePageContent(url, popstate = false) {
  if (!url) {
    return
  }

  const progressBar = document.createElement('div')
  progressBar.style.background = 'rgb(48, 79, 253)'
  progressBar.style.boxShadow = 'rgb(0 0 0 / 15%) 0 4px 5px 0px'
  progressBar.style.position = 'fixed'
  progressBar.style.top = 0
  progressBar.style.right = 0
  progressBar.style.left = 0
  progressBar.style.height = '4px'
  progressBar.style.transitionDuration = '500ms'
  progressBar.style.zIndex = 100000
  progressBar.style.transform = 'translate( - 100% )'

  document.body.appendChild(progressBar)

  let _url = `/ajax/get-page-content?url=${url}`
  let xhr = new XMLHttpRequest();


  console.log('async Page Start: ', performance.now());
  xhr.onprogress = function (e) {
    if (e.lengthComputable) {
      let percent = (e.loaded / e.total) * 100;
      progressBar.style.transform = 'translate(' + (90 - percent) + '%)'
    }
  };
  xhr.open('GET', _url, true);
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.onreadystatechange = async function () {

    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log('async Page End: ', performance.now());

      if (!xhr.responseText || xhr.status !== 200 && xhr.status !== 404) {
        console.error('Response Error: ' + xhr.responseText)
      }
      try {
        const newPageData = await _replace(xhr.responseText)
        progressBar.style.transform = 'translate(100%)'
        if (!popstate) {
          window.history.replaceState({
            altrpCustomNavigation: true
          }, newPageData.title, location.href)
          window.history.pushState({
            altrpCustomNavigation: true
          }, newPageData.newTitle, url)
        }
      } catch (e) {
        console.error(e);
        location.href = url
      } finally {
        progressBar.remove()
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(e);
    // location.href = url
  }
  xhr.send(null);
}

function migrateScript(target, source) {
  const scripts = source.querySelectorAll('script')
  scripts.forEach( (s)=> {
    const newScript = document.createElement('script')
    if(s.innerHTML){
      newScript.innerHTML = s.innerHTML

    } else if(s.getAttribute('src')){
      newScript.setAttribute('src', s.getAttribute('src'))
    }
    source.appendChild(newScript)
  })
}

async function _replace(htmlString) {
  htmlString = htmlString.replace(/<!([\s\S]+?)>/, '')
  const newHtml = document.createElement('html')
  newHtml.innerHTML = htmlString


  /**
   * CSS links
   */

  let links = newHtml.querySelectorAll('link')

  let stylesContainer = document.createElement('div')

  stylesContainer.classList.add('migrated-styles')
  document.body.appendChild(stylesContainer)


  const newStyles = newHtml.querySelectorAll('style')
  for (const s of newStyles) {
    stylesContainer.appendChild(s)
  }
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


  /**
   * parsing areas
   */

  const oldAreas = document.querySelectorAll('.app-area');
  const newAreas = newHtml.querySelectorAll('.app-area');
  for (const area of oldAreas) {
    if (!newHtml.querySelector(`.${area.classList.value.replace(/ /g, '.')}`)) {
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

  for (const idx in newAreas) {
    // routeContent.appendChild(area)

  }
  newAreas.forEach((a, idx) => {

    // oldAreas.forEach((oa, _idx)=>{
    //
    // })
    const oldArea = routeContent
      .querySelector(`.${a.classList.value.replace(/ /g, '.')}`)

    if (!oldArea) {
      const newArea = document.createElement('div' )
      a.classList.value.split(' ').forEach(c=>{
        if(c){
          newArea.classList.add(c)
        }
      })
      newArea.innerHTML = a.innerHTML
      migrateScript(newArea, a)
      routeContent.appendChild(newArea)
      return
    }
    const newSectionWrapper = a.querySelector('.sections-wrapper')
    if (!newSectionWrapper) {
      oldArea.innerHTML = ''
      return
    }
    if (oldArea.querySelector(`.${newSectionWrapper.classList.value.replace(/ /g, '.')}`)) {
      return;
    }
    oldArea.innerHTML = a.innerHTML
    migrateScript(oldArea, a)

  })

  const title = document.querySelector('title')
  const newTitle = newHtml.querySelector('title')
  title.innerHTML = newTitle.innerHTML

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

  oldMainScript.innerHTML = mainScript.innerHTML
  /**
   * grid stiles for route content
   */

  /**
   * bar-portal
   */
  document.querySelector('.admin-bar-portal')?.remove()
  window.popupsContainer?.remove()
  window.popupsContainer = null




  /**
   * Events dispatch
   */
  const event = new Event('DOMContentLoaded')
  document.dispatchEvent(event)
  window.hAltrp.loadComponents()
  appStore.dispatch(clearCurrentDataStorage())
  appStore.dispatch(clearElements())
  window.altrpContentLoaded = false

  let params = window?.__altrp_settings__?.page_params
  if (!params) {
    params = convertQueryParamsToObject(document?.location?.search);
  }
  let hashParams = {};
  if (document?.location?.hash && document?.location?.hash.indexOf('=') !== -1) {
    hashParams = convertQueryParamsToObject(document?.location?.hash)
  }

  appStore.dispatch(changeCurrentPage({
    url: location?.href || "",
    title: window?.currentPage?.title || "",
    hash: document?.location?.hash,
    hashParams,
    params,
  }))
  window.addEventListener('h-altrp-loaded', mountElements);
  window._hAltrp()

  const stylesContainers = document.querySelectorAll('.migrated-styles')
  if(stylesContainers.length > 2){
    stylesContainers[0].remove()
  }
  return {
    newTitle,
    title
  }
}
