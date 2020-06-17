import {CONTROLLER_REPEATER} from "../classes/modules/ControllersManager";

/**
 * Обновление значения в компоненте контроллера при загрузке нового экземпляра того же элемента
 */
function componentDidUpdate() {
  if(!this.props.repeater){
    let elementValue = this.props.currentElement.getSettings(this.props.controlId);
    if(this.state.value !== elementValue){
      if(elementValue === null){
        elementValue = this.getDefaultValue();
        this.props.currentElement.setSettingValue(this.props.controlId, elementValue);
      }
      this.setState({
        value: elementValue
      });
    }
  } else {
  }
}

/**
 * @function _changeValue
 * Обновление значения в  контроллере
 */
function _changeValue(value) {
  if(typeof value === 'object'){
    value = {...value};
  }
  this.setState((state)=>{
    return {
      ...state,
      value,
    }
  });
  this.props.controller.changeValue(value);
}

let controllerDecorate = function elementWrapperDecorate(component) {
  component.componentDidUpdate = componentDidUpdate.bind(component);
  component._changeValue = _changeValue.bind(component);
};
export default controllerDecorate;