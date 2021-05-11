/**
 * Обновить стили в кэше для текущего url
 * @return {Promise<void>}
 * @param styles
 */
export async function saveStyleToCache(styles = []){
  if(! styles.length){
    return;
  }
}

/**
 * Обновить контент опредленного виджета в кэше
 * @param widgetContent
 * @param widgetId
 * @return {Promise<void>}
 */
export async function updateWidgetInCache(widgetContent, widgetId){
  if(! styles.length){
    return;
  }
}

/**
 * отрисовать все секции
 */
export function loadLazySections(){
  let rootElement = window.header_root_element;
  if(rootElement){
    rootElement.children.forEach(section => {
      section.lazySection = false;
    });
  }
  rootElement = window.content_root_element;
  if(rootElement){
    rootElement.children.forEach(section => {
      section.lazySection = false;
    });
  }
  rootElement = window.footer_root_element;
  if(rootElement){
    rootElement.children.forEach(section => {
      section.lazySection = false;
    });
  }
}
