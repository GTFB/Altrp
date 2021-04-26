export const SET_SCROLL_TOP = "SET_SCROLL_TOP";
let lazyUpdate = false;
/**
 *
 * @param {{
 *  top: int
 * }} payload
 * @return {{type: string, payload: {}}}
 */
export const setScrollValue = payload => {
  // console.log(lazyUpdate);
  if(payload.top !== 0 && lazySections && ! lazyUpdate) {
    console.log(lazySections);
    lazyUpdate = true;
    lazySections.forEach( section=>{
      let rootParent = (section.area_name
          && window[`${section.area_name}_root_element`]
          && window[`${section.area_name}_root_element`].id === section.parent_id) ? window[`${section.area_name}_root_element`] : null;

      if(rootParent){
        section = frontElementsFabric.parseData(section.element);
        section.setParent(rootParent);
        rootParent.children.push(section);
      }

    });

    /**
     * Скопируем все секции для ленивой подгрузки в хранилище страниц (текущая стрнаца)
     */
    for(let pageId in window.pageStorage){
      if(window.pageStorage.hasOwnProperty(pageId) ){
        let page = window.pageStorage[pageId];
        window.lazySections.forEach(section => {
          let area = page.areas.find(area => area.id === section.area_name);
          if(area){
            area.template.data.children.push(section.element)
          }
        });
      }
    }
    lazySections = null;
    // _.forEach(elements,el=>{
    //   if(_.get(el, 'props.element.getId')){
    //     if(el.props.element.getId() === ){
    //
    //     }
    //   }
    // })
  }
  return {
    type: SET_SCROLL_TOP,
    payload
  };
};