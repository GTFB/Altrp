import store from '../store/store';
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
 * Обновление значения в  контроллере\
 * и передача в класс Controller
 * @member {object} props
 * @property {Controller} props.controller
 */
function _changeValue(value) {
  if(typeof value === 'object' && value.length !== undefined){
    value = [...value];
  }else if(typeof value === 'object'){
    value = {...value};
  }

  if(value && ! value.dynamic){
    this.setState((state)=>{
      return {
        ...state,
        value,
      }
    });
  } else {
    this.setState((state)=>{
      return {
        ...state,
        dynamicValue: value,
      }
    });
  }
  this.props.controller.changeValue(value);

}

/**
 * Проверка отображения condition. Работает в случае если controller в root element = true
 * При false не видит контроллер и не может вызвать его при condition
 */

function conditionSubscriber() {
  // const controllerValue = store.getState().controllerValue;
  // if(this.props.condition) {
  //   if(this.props.condition[controllerValue.controlId]) {
  //     if(controllerValue.controlId === Object.keys(this.props.condition)[0]) {
  //       if(controllerValue.value !== this.props.condition[controllerValue.controlId] && this.props.controlId !== controllerValue.controlId) {
  //         this.setState((state) => {
  //           return {
  //             ...state,
  //             show: false,
  //           }
  //         });
  //       } else {
  //         this.setState((state) => {
  //           return {
  //             ...state,
  //             show: true,
  //           }
  //         });
  //       }
  //     }
  //   }
  // }
  if(this.props.condition) {
    const controllerValue = store.getState().controllerValue;
    if(Object.keys(this.props.condition).indexOf(controllerValue.controlId)>=0){
      this.props.controller.isShow() ? this.showComponentController() : this.hideComponentController() ;
    }
  }
}

/**
 * Метод вызывается, когда компонент контроллера загружается
 */
async function  controllerComponentDidMount() {
  /**
   * Сначала проверим нужно ли отрисовывать контроллер по умолчанию
   */
  this.props.controller.isShow() ? this.showComponentController() : this.hideComponentController();

  if(this.resource){
    let options = await this.resource.getAll();
    if(this.props.nullable){
      options = _.concat([{'':''}], options);
      console.log(options);
    }
    this.setState(state=>({...state, options}));
    this._changeValue(options[0].value);
  }
}

/**
 * Скрываем компонент контроллера,
 * удаляем свойство у текущего элемента
 */
function hideComponentController() {
  this.setState(state=>({
    ...state,
    show: false,
  }));
  this.props.currentElement.deleteSetting();
  this.props.controller.changeValue(null);
}

/**
 * Скрываем компонент контроллера,
 * удаляем свойство у текущего элемента
 */
function showComponentController() {
  this.setState(state=>({
      ...state,
    show: true,
  }));
}

let controllerDecorate = function elementWrapperDecorate(component) {
  component.componentDidUpdate = componentDidUpdate.bind(component);
  component._changeValue = _changeValue.bind(component);
  component.conditionSubscriber = conditionSubscriber.bind(component);
  component.componentDidMount = controllerComponentDidMount.bind(component);
  component.hideComponentController = hideComponentController.bind(component);
  component.showComponentController = showComponentController.bind(component);
  store.subscribe(component.conditionSubscriber);
};
export default controllerDecorate;
