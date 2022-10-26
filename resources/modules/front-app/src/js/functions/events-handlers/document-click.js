import replacePageContent from "../../helpers/replace-page-content";

document.addEventListener('click', spaNavigation)
export default function spaNavigation(e){

  if(window?.altrp?.spa_off){
    return;
  }
  let target = e.target
  while(target && target.tagName && target.tagName.toLowerCase() !== 'a'){
    target = target.parentNode
  }



  if(! target || ! target.getAttribute){
    return
  }

  if(! target.hasAttribute('href')){
    return;
  }

  let url = target.getAttribute('href')
  if(! url){
    return;
  }
  if(url.indexOf('/') !== 0
    && url.indexOf(location.origin) !== 0){
    return;
  }
  if(target.hasAttribute('target') && target.getAttribute('target') || target.hasAttribute('download')){
    return;
  }

  url = url.replace(location.origin, '')
  url = location.origin + url
  url = new URL(url)

  if(! _checkUrl(url)){
    return
  }
  e.preventDefault();

  if(location.pathname + location.search !== url.pathname + url.search){

    try{
      replacePageContent(url.pathname + url.search + url.hash)
    }catch (e) {
      console.error(e);
      location.href = url
    }
  }
}

function _checkUrl(url){
  console.log(url);
  let segments = url.pathname.split('/')
  let filename = segments[segments.length - 1]
  console.log(filename);
  let ext= filename.split('.')
  ext = ext[ext.length - 1]
  if(ext === filename){
    return true
  }
  if(ext === 'html' || ext === 'htm'){
    return true
  }
  return false
}

window.addEventListener('popstate', e =>{

  if(e?.state?.altrpCustomNavigation){
    try {
      replacePageContent(window.location.pathname + window.location.search + window.location.hash, true)
    }catch (e) {
      console.error(e);
      window.location.replace(window.location.pathname + window.location.search + window.location.hash);
    }
  }
})
