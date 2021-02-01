import frontDecorate from '../../../../front-app/src/js/decorators/front-element-component'
import {getTemplateType} from "../helpers";
import rootElementEmailRender from '../renders/email/rootElementEmailRender';
import sectionElementEmailRender from '../renders/email/sectionElementEmailRender';
/**
 * Обновляем state элемента при изменении настроек в редакторе
 * @param settingName
 * @param value
 */
export function changeSetting(settingName, value) {
  let newState = _.cloneDeep(this.state);
  newState.settings[settingName] = value;
  console.log(newState.settings[settingName])

  /**
   * Если виджет поле, то обнолвяем и значение
   */
  if((settingName === 'content_default_value')){
    newState.value = value;
  }

  this.setState({
    ...newState
  }, () => {
    console.log("------------------------")
    console.log(this.state);
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

/**
 * Отрисовка контента элемента для писем
 * @param component
 * @return {*}
 */
function baseEmailRender(component){
  switch(component.props.element.getName()){
    case 'root-element':{
      return rootElementEmailRender.bind(component);
    }
    case 'section':{
      return sectionElementEmailRender.bind(component);
    }
  }
  return ()=>null;
}

export default function decorate(component) {
  component.changeSetting = changeSetting.bind(component);
  component.setChildren = setChildren.bind(component);
  component.render = editorElementRender(component, component.render);
  frontDecorate(component);
}