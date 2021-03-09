import React, { Component } from "react";
import ChevronIcon from '../../svgs/chevron.svg'
import { connect } from "react-redux";
import { getCurrentElement, getCurrentTab, getElementState } from "../store/store";
import { setActiveSection } from "../store/setting-section/actions";
import {getTemplateType} from "../helpers";

class SettingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hidden: false,
    };
    this.toggle = this.toggle.bind(this);
  };

  componentDidMount() {

    /**
     * Если еще ни разу не открывали текущую вкладку у элемента,
     * то в setActiveSection передадим 0
     */
    let currentElementName = getCurrentElement().getName();
    let currentTab = getCurrentTab();
    if (! (this.props.settingSection[currentElementName]
        && (this.props.settingSection[currentElementName][currentTab] !== undefined))) {
      this.props.dispatch(setActiveSection(getCurrentElement().getName(), getCurrentTab(), 0));
    }
    this.checkSectionDisplay();
  }

  componentDidUpdate(){
    this.checkSectionDisplay();
  }

  toggle() {
    this.props.dispatch(setActiveSection(getCurrentElement().getName(), getCurrentTab(), this.props.sectionID));
  };

  /**
   * Проверим условие отображения
   * @return {undefined}
   */
  checkSectionDisplay(){

    if(this.props.conditionsCallback){
      let hidden = ! this.props.conditionsCallback();
      if(this.state.hidden === hidden) {
        return
      }
      this.setState(state => ({...state, hidden }));
      return ;
    }
    if(! this.props.conditions){
      return;
    }
    let hidden = false;

    let conditionPairs = _.toPairs(this.props.conditions);
    conditionPairs.forEach(condition => {
      let [controlId, comparedValue] = condition;
      let negative = controlId.indexOf("!") >= 0;
      controlId = controlId.replace("!", "");
      let _value = getCurrentElement().getSettings(controlId);
      if (!_.isArray(_value)) {
        _value = [_value];
      } else if (_value.length === 0) {
        hidden = true;
      }
      _value.forEach(value => {
        if (hidden) {
          return;
        }
        if (_.isString(comparedValue) || _.isBoolean(comparedValue)) {
          hidden = value !== comparedValue ? !negative : negative;
        }
        if (_.isArray(comparedValue)) {
          hidden = comparedValue.indexOf(value) === -1 ? !negative : negative;
        }
      });
    });
    if(this.state.hidden !== hidden){
      this.setState(state => ({...state, hidden}));
    }
  }
  render() {
    if(this.state.hidden){
      return null;
    }
    let currentElementName = getCurrentElement().getName();
    let currentTab = getCurrentTab();
    let activeSectionID = 0;
    /**
     * Сравниваем с undefined
     */
    if (this.props.settingSection[currentElementName]
        && (this.props.settingSection[currentElementName][currentTab] !== undefined)) {
      activeSectionID = this.props.settingSection[currentElementName][currentTab];
    }
    let controllers = this.props.controls || [];
    if(this.props.hideOnEmail && getTemplateType() === 'email'){
      return '';
    }
    controllers = controllers.filter(controller => {
      return ! (controller.hideOnEmail && getTemplateType() === 'email');
    });
    return (
      <div  className={"settings-section " + (this.props.sectionID === activeSectionID ? 'open' : '')}>
        <div className="settings-section__title d-flex" onClick={this.toggle}>
          <div className="settings-section__icon d-flex ">
            <ChevronIcon />
          </div>
          <div className="settings-section__label">
            {this.props.label}
          </div>
        </div>
        <div className="controllers-wrapper">
          {
            controllers.map((controller) => {
              let ControllerComponent = window.controllersManager.getController(controller.type);
              return React.createElement(ControllerComponent, { ...controller, key: controller.controlId });
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settingSection: state.settingSectionMenu,
    controllerValue: state.controllerValue,
  }
};


export default connect(mapStateToProps, null)(SettingSection);
