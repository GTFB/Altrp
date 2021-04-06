/**
 * Включаем версию сайта для слабовидящих
 */
export function vIOn(){
  if(document.getElementsByClassName('bvi-body').length){
    return;
  }
  const link = document.body.appendChild(document.createElement('a'));
  link.classList.add('altrp-bvi-open');
  $.bvi({
    bvi_target: '.altrp-bvi-open'
  });
  link.click();
  link.remove();
}
/**
 * Загружаем BVI, если не заргужен
 * @param {boolean} init - нужно ли включать
 * @return {Promise<void>}
 */
export async function loadVIPlugin(init = true){
  await loadJQuery();

  if(document.querySelector('link[href="/plugins/button-visually-impaired-javascript/css/bvi.min.css"]')
      // && document.querySelector('script[src="/plugins/button-visually-impaired-javascript/js/js.cookie.min.js"]')
      // && document.querySelector('script[src="/plugins/button-visually-impaired-javascript/js/bvi-init.min.js"]')
      && document.querySelector('script[src="/plugins/button-visually-impaired-javascript/js/bvi.min.js"]')
  ){
    init && vIOn();
    return;
  }

  const bVIStyles = document.head.appendChild(document.createElement('link'));
  bVIStyles.setAttribute('href', '/plugins/button-visually-impaired-javascript/css/bvi.min.css');
  bVIStyles.setAttribute('rel', 'stylesheet');

  const style = document.head.appendChild(document.createElement('style'));
  style.setAttribute('type', 'text/css');
  // language=CSS
  const css = `
  .bvi-body{
    height: 100%;
  }
  .bvi-link-copy{
    display: none!important;
  }
  .bvi-hide.admin-bar,
  .bvi-hide.altrp-element{
    display: flex;
  }
  `;
  if (style.styleSheet){
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  // const jsCookieScript = document.head.appendChild(document.createElement('script'));
  // jsCookieScript.setAttribute('src', '/plugins/button-visually-impaired-javascript/js/js.cookie.min.js');

  const bVIScript = document.head.appendChild(document.createElement('script'));
  bVIScript.setAttribute('src', '/plugins/button-visually-impaired-javascript/js/bvi.min.js');

  // const bVIInitScript = document.head.appendChild(document.createElement('script'));
  // bVIInitScript.setAttribute('src', '/plugins/button-visually-impaired-javascript/js/bvi-init.min.js');

  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  
  let scriptsLoaded = 0;
  const loadChecker = ()=>{
    if(++scriptsLoaded < 2){
      return;
    }
    init && vIOn();
    resolve && resolve();
  };

  bVIStyles.onload = loadChecker;
  // jsCookieScript.onload = loadChecker;
  bVIScript.onload = loadChecker;

  bVIStyles.onerror = () => {
    reject && reject()
  };
  // jsCookieScript.onerror = () => {
  //   reject && reject()
  // };
  // bVIInitScript.onerror = () => {
  //   reject && reject()
  // };
  bVIScript.onerror = () => {
    reject && reject()
  };
  return promise;
}

/**
 * Загружаем jQuery, если не заргужен
 * @return {Promise<void>}
 */
export async function loadJQuery(){
  if(document.querySelector('script[src="/plugins/jquery.js"]')){
    return;
  }

  const jQueryScript = document.head.appendChild(document.createElement('script'));
  jQueryScript.setAttribute('src', '/plugins/jquery.js');

  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  jQueryScript.onload = () => {
    resolve && resolve()
  };
  jQueryScript.onerror = () => {
    reject && reject()
  };

  return promise;
}