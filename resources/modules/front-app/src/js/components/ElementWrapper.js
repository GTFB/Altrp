import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import appStore from "../store/store"
import {conditionsChecker} from "../helpers";

class ElementWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentModel: appStore.getState().currentModel,
      currentUser: appStore.getState().currentUser,
      formsStore: appStore.getState().formsStore,
      elementDisplay: true,
    };
    appStore.subscribe(this.updateStore)
  }

  /**
   * Отлавливаем ошибки
   * @param error
   * @param errorInfo
   */
  componentDidCatch(error, errorInfo) {
    this.setState(state=>({
      ...state,
      error: error,
      errorInfo: errorInfo
    }));
  }

  /**
   * Подписываемся на обновление store редакса
   * (обновляем, только если currentModel изменилась)
   */
  updateStore = () => {
    if(this.state.currentModel !== appStore.getState().currentModel){
      this.setState(state => ({...state, currentModel: appStore.getState().currentModel}));
    }
    if(this.state.currentUser !== appStore.getState().currentUser){
      this.setState(state => ({...state, currentModel: appStore.getState().currentUser}));
    }

    if((this.props.element.getName() === 'input') && this.state.formsStore !== appStore.getState().formsStore){
      // console.log(this.state.formsStore);
      // console.log(appStore.getState().formsStore);
      this.setState(state => ({...state, formsStore: appStore.getState().formsStore}));
    }
  };

  /**
   * Нужно ли обновить отображение обертки элементов
   */
  componentDidUpdate(){
    this.checkElementDisplay();
  }

  /**
   * Проверка видимости элемента
   */
  checkElementDisplay(){
    /**
     * @member {FrontElement} element
     */
    const {element} = this.props;
    if(! element.getSettings('conditional_other')){
      return;
    }
    let conditions = element.getSettings('conditions',[]);
    // console.log(this.state.currentModel);
    let elementDisplay = conditionsChecker(conditions,
        element.getSettings('conditional_other_display') === 'AND',
        this.state.currentModel);
    if(this.state.elementDisplay === elementDisplay){
      return;
    }
    this.setState(({
      elementDisplay
    }));
  }

  render() {
    const { 
      hide_on_wide_screen,
      hide_on_desktop,
      hide_on_laptop,
      hide_on_tablet,
      hide_on_big_phone,
      hide_on_small_phone 
    } = this.props.element.settings;

    let classes = `altrp-element altrp-element${this.props.element.getId()} altrp-element_${this.props.element.getType()}`;
    classes += this.props.element.getPrefixClasses() + " ";
    if(this.props.element.getType() === 'widget'){
      classes += ` altrp-widget_${this.props.element.getName()}`;
    }
    if (hide_on_wide_screen) {
      classes += ' hide_on_wide_screen';
    }
    if (hide_on_desktop) {
      classes += ' hide_on_desktop';
    }
    if (hide_on_laptop) {
      classes += ' hide_on_laptop';
    }
    if (hide_on_tablet) {
      classes += ' hide_on_tablet';
    }
    if (hide_on_big_phone) {
      classes += ' hide_on_big_phone';
    }
    if (hide_on_small_phone) {
      classes += ' hide_on_small_phone';
    }
    if(this.state.errorInfo){
      return  <div className="altrp-error">
        <h2>Something went wrong.</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.errorInfo.componentStack}
        </details>
      </div>
    }
    const styles = {};
    if(! this.state.elementDisplay){
      styles.display = 'none';
    }
    return <div className={classes} style={styles}>
      {
        React.createElement(this.props.component, {
          element: this.props.element,
          children: this.props.element.getChildren(),
          match: this.props.match,
          currentModel: this.state.currentModel,
          currentUser: this.state.currentUser,
          formsStore: this.state.formsStore,
          appStore
        })
      }
    </div>
  }
}

export default withRouter(ElementWrapper);
