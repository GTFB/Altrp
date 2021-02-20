import frontDecorate from '../../../../front-app/src/js/decorators/front-element-component'
import {getTemplateType} from "../helpers";
import {baseEmailRender} from "./base-email-render";
/**
 * Обновляем state элемента при изменении настроек в редакторе
 * @param settingName
 * @param value
 */
export function changeSetting(settingName, value) {
  let newState = _.cloneDeep(this.state);
  newState.settings[settingName] = value;

  /**
   * Если виджет поле, то обнолвяем и значение
   */
  if((settingName === 'content_default_value')){
    newState.value = value;
  }

  this.setState({
    ...newState
  });
}

export function setChildren(children) {
  this.setState({
      ...this.state,
    children
  });
  if(this.props.wrapper && this.props.wrapper.setState){
    this.props.wrapper.setState(()=> ({
      ...this.state,
      children
      })
    );
  }
}

/**
 * Заменяем рендер по умолчанию на рендер соответствующего типа, например для почты
 * @param component
 * @param defaultRender
 * @return {*}
 */
function editorElementRender(component, defaultRender){
  switch(getTemplateType()){
    case 'email':{
      return baseEmailRender(component);
    }
  }
  return defaultRender.bind(component)
}


export default function decorate(component) {
  component.changeSetting = changeSetting.bind(component);
  component.setChildren = setChildren.bind(component);
  component.render = editorElementRender(component, component.render);
  frontDecorate(component);
}