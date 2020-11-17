import frontDecorate from '../../../../front-app/src/js/decorators/front-element-component'
/**
 * Обновляем state элемента при изменении настроек в редакторе
 * @param settingName
 * @param value
 */
export function changeSetting(settingName, value) {
  let newState = this.state;
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

export default function decorate(component) {
  component.changeSetting = changeSetting.bind(component);
  component.setChildren = setChildren.bind(component);
  frontDecorate(component);
}