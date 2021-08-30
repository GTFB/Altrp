
export default async function  loadSticky() {
  if (document.querySelector('[data-altrp-sticky]:not([data-altrp-sticky-loaded])')) {
    const {loadJQuery} = await import('../helpers/plugins');
    await loadJQuery();
    await loadStickyPlugin();
    $('[data-altrp-sticky]:not([data-altrp-sticky-loaded])').each(function(){
      let $this = $(this)
      const stickyOptions = {

      };
      switch($this.data('altrp-sticky')){
        case 'top':{
          stickyOptions.topSpacing = $this.data('altrp-sticky-spacing') || 0
          $this.sticky(stickyOptions)
        }break;
        case 'bottom':{
          stickyOptions.bottomSpacing = $this.data('altrp-sticky-spacing') || 0
        }break;
      }
      console.log($this);
      $this.attr('data-altrp-sticky-loaded', true)
      const frontAppContainer = document.getElementById('front-app');
      frontAppContainer.addEventListener('scroll', ()=>{
        $this.sticky('update')
      })
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
