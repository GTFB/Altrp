import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import SettingsIcon from '../../../svgs/settings.svg'
import controllerDecorate from "../../decorators/controller";

class LinkController extends Component {
  constructor(props){
    super(props);
    this.settings = this.settings.bind(this);
    this.toggleSettingsNewPage = this.toggleSettingsNewPage.bind(this);
    this.toggleSettingsNoFollow = this.toggleSettingsNoFollow.bind(this);
    this.changeAttribute = this.changeAttribute.bind(this);
    this.changeInput = this.changeInput.bind(this)
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value};
    controllerDecorate(this);
  }

  settings() {
    let settings = document.getElementById("settings");
    settings.classList.toggle("settingBlock-none");
  };

  toggleSettingsNewPage(){
    let toggleSettingsNewPageCheckbox= document.getElementById("toggleSettingsNewPageCheckbox");

    let changeCheckBox = togglesettingsNoFollowCheckbox.hasAttribute("checked")
    if(toggleSettingsNewPageCheckbox.hasAttribute("checked") == false) {
      this._changeValue({
        openInNew: changeCheckBox
      })
      toggleSettingsNewPageCheckbox.setAttribute("checked", "checked");
    } else {
      this._changeValue({
        openInNew: changeCheckBox
      })
      toggleSettingsNewPageCheckbox.removeAttribute("checked");
    };
  };

  toggleSettingsNoFollow(){
    let togglesettingsNoFollowCheckbox = document.getElementById("togglesettingsNoFollowCheckbox")

    let changeCheckBox = togglesettingsNoFollowCheckbox.hasAttribute("checked")
    if(changeCheckBox == false) {
      this._changeValue({
        noFollow: changeCheckBox
      })
      togglesettingsNoFollowCheckbox.setAttribute("checked", "checked");
    } else {
      togglesettingsNoFollowCheckbox.removeAttribute("checked");
      this._changeValue({
        noFollow: changeCheckBox
      })
    };

  };

  changeAttribute(e){
    this._changeValue({
      attributes:e.target.value
    })
    console.log(this.state.value.attributes)
  }

  changeInput(e){
    this._changeValue({
      url:e.target.value
    })
  }

  getDefaultValue(){
    return '';
  }

  render(){
    
    return <div className="controller-container controller-container_link">
      <div className="control-link-header">
        <div className="controller-container__label">{this.props.label}</div>
      </div>
      <div className="control-link-input-wrapper">
        <input onChange={this.changeInput} value={this.state.value.url || ''} type="text" className="control-link" placeholder="введите ссылку"></input>
        <div className="control-link-settings control-link-button" onClick={this.settings}>
        {/* тут есть проблема с размерами, просто нужно убрать width и height в самой svg но есть одна проблема*/}
          <SettingsIcon width="12"/>
        </div>
        <div className="control-link-dynamic control-link-button">
            <DynamicIcon width="12"/>
        </div>
      </div>
        <div id="settings" className="settingBlock settingBlock-none">
          <div className="settings-checkbox-option" onClick={this.toggleSettingsNewPage}>
            <input id="toggleSettingsNewPageCheckbox" type="checkbox" className="settings-checkbox"/>
            <span className="settings-checkbox-container"/>
            <label className="settings-checkbox__label">Открывать в новом окне</label>
          </div>
          <div className="settings-checkbox-option" onClick={this.toggleSettingsNoFollow}>
            <input id="togglesettingsNoFollowCheckbox" type="checkbox" className="settings-checkbox"/>
            <span className="settings-checkbox-container"/>
            <label className="settings-checkbox__label">Добавить nofollow</label>
          </div>
          <div className="customAttributes">
            <div className="control-link-header">
              <label className="controller-container__label">Произвольные атрибуты</label>
            </div>
            <input onChange={this.changeAttribute}
                   value={this.state.value.attributes || ''}
                   type="text"
                   placeholder="key|value, key|value..."
                   className="settings-input-attribute"/>
            <a className="settings-attribute-description">Задайте пользовательские атрибуты для ссылки. Отделяйте ключи атрибута от значений с помощью символа | (труба). Разделите пары ключ-значение запятой.</a>
          </div>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(LinkController);
