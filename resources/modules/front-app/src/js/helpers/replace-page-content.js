import {clearCurrentDataStorage} from "../store/current-data-storage/actions";
import {clearElements} from "../store/elements-storage/actions";
import mountElements from "../functions/mount-elements";
import {changeCurrentPage} from "../store/current-page/actions";
import convertQueryParamsToObject from "../functions/convert-query-params-to-object";

export default function replacePageContent(url, popstate = false){
  if(! url){
    return
  }

  const progressBar = document.createElement('div')
  progressBar.style.background= 'rgb(48, 79, 253)'
  progressBar.style.boxShadow= 'rgb(0 0 0 / 15%) 0 4px 5px 0px'
  progressBar.style.position= 'fixed'
  progressBar.style.top= 0
  progressBar.style.right= 0
  progressBar.style.left=0
  progressBar.style.height= '4px'
  progressBar.style.transitionDuration= '5000ms'
  progressBar.style.zIndex= 100000
  progressBar.style.transform = 'translate( - 100% )'

  document.body.appendChild(progressBar)

  let _url = `/ajax/get-page-content?url=${url}`
  let xhr = new XMLHttpRequest();


  xhr.onprogress = function(e){
    if (e.lengthComputable)
    {
      let percent = (e.loaded / e.total) * 100;
      progressBar.style.transform = 'translate(' + (100 - percent) + '%)'
      console.log('percent' + percent);
    }
  };
  xhr.open('GET', _url, true);
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.onreadystatechange = function() {

    if (xhr.readyState === XMLHttpRequest.DONE) {

      if(! xhr.responseText || xhr.status !== 200 && xhr.status !== 404){
        console.error( 'Response Error: ' + xhr.responseText)
      }
      try {
        const newPageData = _replace(xhr.responseText)
        if (! popstate){
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
  xhr.onerror = function(e){
    console.error(e);
    // location.href = url
  }
  xhr.send(null);
}

function _replace(htmlString){
  htmlString = htmlString.replace(/<!([\s\S]+?)>/, '')
  const newHtml = document.createElement('html')
  newHtml.innerHTML = htmlString
  const newContentStyle = newHtml.querySelector('#content_style')

  let oldStyles = document.querySelector('#content_style')
  if(! oldStyles){
    oldStyles = document.createElement('style')
    oldStyles.setAttribute('id', 'content_style')
    document.head.appendChild(oldStyles)
  }
  oldStyles.innerHTML = newContentStyle.innerHTML

  const mainScript = newHtml.querySelector('#main-script-altrp')

  let oldMainScript = document.querySelector('#main-script-altrp')
  if(oldStyles){
    oldStyles.remove()
  }
  oldMainScript = document.createElement('script')
  oldMainScript.setAttribute('id', 'main-script-altrp')
  document.body.appendChild(oldMainScript)


  oldMainScript.innerHTML = mainScript.innerHTML

  document.querySelector('#content_style')
  const oldAreas = document.querySelectorAll('.app-area');
  for(const area of oldAreas) {
    // console.log(area.className);
    let selector = area.className
    selector = selector.trim()
    selector = selector.split(' ')
    selector = selector.filter(s => s)
    selector = selector.join('.')
    selector = `.${selector}`
    const newArea = newHtml.querySelector(selector)
    area.innerHTML = newArea.innerHTML
  }
  const title = document.querySelector('title')
  const newTitle = newHtml.querySelector('title')
  title.innerHTML = newTitle.innerHTML


  /**
   * CSS links
   */

  let links = newHtml.querySelectorAll('link[id*=altrp]')


  links.forEach(l=>{
    if(document.querySelector(`#${l.getAttribute('id')?.split(' ').join('#')}`)){
      return
    }
    const newLink =  document.createElement('link')
    newLink.setAttribute('id', l.getAttribute('id'))
    newLink.setAttribute('href', l.getAttribute('href'))
    newLink.setAttribute('rel', 'stylesheet')
    newLink.addEventListener('load', ()=>{
      console.log('new link loaded');
    })
    document.body.appendChild(newLink)
  })
  document.querySelector('.admin-bar-portal')?.remove()
  window.popupsContainer?.remove()
  window.popupsContainer = null
  const event = new Event('DOMContentLoaded')
  document.dispatchEvent(event)

  window.hAltrp.loadComponents()
  appStore.dispatch(clearCurrentDataStorage())
  appStore.dispatch(clearElements())

  window.altrpContentLoaded = false

  let params = window?.__altrp_settings__?.page_params
  if( ! params){
    params= convertQueryParamsToObject(document?.location?.search);
  }
  let hashParams = {};
  if(document?.location?.hash && document?.location?.hash.indexOf('=') !== -1){
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
  return{
    newTitle,
    title
  }
}
