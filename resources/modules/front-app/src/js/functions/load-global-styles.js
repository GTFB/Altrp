import {replaceAllSettings} from "../store/elements-settings/actions";
import {StyleSheetManager} from "styled-components";

/**
 * Загрузка отрисовщика стилей
 */
export default function loadGlobalStyles(){
  import(/* webpackChunkName: 'EmailTemplatesRenderer' */'../components/GlobalStyles').then(module => {
    const GlobalStyles = module.default;
    const stylesContainer = document.createElement('div');
    document.body.appendChild(stylesContainer);

    window.ReactDOM.render(<window.Provider store={window.appStore}>
      <StyleSheetManager disableCSSOMInjection={true}>
        <GlobalStyles/>
      </StyleSheetManager>
    </window.Provider>, stylesContainer)
  });
}

export function addSettingsToStore(){

  const settings = {};
  window.page_areas.forEach(area=>{
    const rootElement = _.get(area, 'template.data');
    if(rootElement){
      recurseAddSettings(rootElement)
    }
    if(_.isArray(_.get(area, 'templates'))){
      const templates = _.get(area, 'templates');
      templates.forEach(template=>{
        recurseAddSettings(template.data)
      })
    }
  });

  /**
   *
   * @param {{}} element
   */
  function recurseAddSettings(element){
    if(! element || ! element.id || ! element.settings || ! element.name){
      return
    }
    settings[element.id] = {
      settings: element.settings,
      name: element.name,
    };
    if(element.name === 'section'){
      settings[element.id].childrenLength = element?.children?.length || 1;
    }
    element.children.forEach(el=>{recurseAddSettings(el)})
  }
  appStore.dispatch(replaceAllSettings(settings));
}
