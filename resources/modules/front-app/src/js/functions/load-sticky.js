
export default async function  loadSticky() {
  if (document.querySelector('[data-altrp-sticky]:not([data-altrp-sticky-loaded])')) {
    const {loadJQuery} = await import(/* webpackChunkName: 'plugins' */'../helpers/plugins');
    await loadJQuery();
    const frontAppContainer = document.getElementById('front-app');
    if($('[data-altrp-sticky="column_top"]').length) {
      await loadStickyJS()
      if(! window.altrpLibs || ! window.altrpLibs.Sticky){
        console.error('"sticky-js" not loaded');
        return
      }
      let sticky = new window.altrpLibs.Sticky('[data-altrp-sticky="column_top"]', {
        stickyContainer: '.altrp-column',
        stickyClass: 'sticky-js-wrapper',
      });
      frontAppContainer.addEventListener('scroll', ()=>{
        sticky.update()
      })
    }
    if($('[data-altrp-sticky]:not([data-altrp-sticky="column_top"])').length){
      await loadStickyPlugin();
    }
    $('[data-altrp-sticky]:not([data-altrp-sticky-loaded])').each(function(){
      let $this = $(this)
      const elementId = $this.attr('data-altrp-id')

      const stickyOptions = {
        wrapperClassName: `sticky-wrapper sticky-wrapper${elementId}`
      };

      switch($this.data('altrp-sticky')){
        case 'top':{
          stickyOptions.topSpacing = $this.data('altrp-sticky-spacing') || 0
          $this.sticky(stickyOptions)
          frontAppContainer.addEventListener('scroll', ()=>{
            $this.sticky('update')
          })
        }break;
        case 'bottom':{
          stickyOptions.bottomSpacing = $this.data('altrp-sticky-spacing') || 0
        }break;
        case 'column_top':{
        }break;
      }

      $this.attr('data-altrp-sticky-loaded', true)
    })
  }
}

/**
 * Загружаем jQuery, если не заргужен
 * @return {Promise<void>}
 */
export async function loadStickyPlugin(){
  let resolve, reject;

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  if(document.querySelector('script[src="/plugins/jquery.sticky.js"]')){
    return;
  }

  const jQueryStickyPluginScript = document.head.appendChild(document.createElement('script'));
  const stickyPluginStyle = document.head.appendChild(document.createElement('style'));
  stickyPluginStyle.innerHTML = `.sticky-wrapper{width:100%;z-index: 10000;}`
  jQueryStickyPluginScript.setAttribute('src', '/plugins/jquery.sticky.js');

  jQueryStickyPluginScript.onload = () => {
    resolve && resolve()
  };
  jQueryStickyPluginScript.onerror = () => {
    reject && reject()
  };

  return promise;
}

/**
 *
 * @returns {Promise<void>}
 */
async function loadStickyJS(){
  window.altrpLibs = window.altrpLibs || {};
  if(window.altrpLibs.Sticky){
    return
  }
  const stickyJSStyle = document.head.appendChild(document.createElement('style'));
  stickyJSStyle.innerHTML = `.sticky-js-wrapper{width:100%;z-index: 10000;}`
  window.altrpLibs.Sticky = (await import(/* webpackChunkName: 'sticky-js' */'sticky-js')).default;
}
