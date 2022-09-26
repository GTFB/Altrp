import replacePageContent from "../../helpers/replace-page-content";

document.addEventListener('click', documentClick)
export default function documentClick(e){


  let target = e.target
  while(target && target.tagName && target.tagName.toLowerCase() !== 'a'){
    target = target.parentNode
  }

  if(! target || ! target.getAttribute){
    return
  }
  let url = target.getAttribute('href')
  if(url.indexOf('/') !== 0
    && url.indexOf(location.origin) !== 0){
    return;
  }
  url = url.replace(location.origin, '')
  url = location.origin + url
  url = new URL(url)

  if(location.pathname + location.search !== url.pathname + url.search){
    e.preventDefault();

    try{
      replacePageContent(url.pathname + url.search + url.hash)
    }catch (e) {
      console.error(e);
      location.href = url
    }
  }
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
