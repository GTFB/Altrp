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
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value, settingsNewPage: false, SettingsNoFollow: false};
    controllerDecorate(this);
  }

  settings(e) {
    let settings = document.getElementById("settings");
    settings.classList.toggle("settingBlock-none");
  };

  toggleSettingsNewPage(){
    let settingsNewPage = document.getElementById("SettingsNewPage")
    this.setState({
      settingsNewPage:!this.state.settingsNewPage
    });
    this.props.currentElement.setSettingValue(this.props.controlId, !this.state.settingsNewPage);
    settingsNewPage.classList.toggle(".settings-checkbox-active")
  };

  toggleSettingsNoFollow(){
    let settingsNoFollow = document.getElementById="settingsNoFollow"
    this.setState({
      settingsNoFollow:!this.state.SettingsNoFollow
    });
    settingsNoFollow.classList.toggle(".settings-checkbox-active")
    this.props.currentElement.setSettingValue(this.props.controlId, !this.state.SettingsNoFollow);
  }

  render(){
    
    return <div className="controller-container controller-container_link">
      <div className="control-link-header">
        <div className="controller-container__label">{this.props.label}</div>
      </div>
      <div className="control-link-input-wrapper">
        <input type="url" className="control-link" placeholder="введите ссылку"></input>
        <div className="control-link-settings control-link-button" onClick={this.settings}>
        {/* тут есть проблема с размерами, просто нужно убрать width и height в самой svg но есть одна проблема*/}
          <SettingsIcon width="12"/>
        </div>
        <div className="control-link-dynamic control-link-button">
            <DynamicIcon width="12"/>
        </div>
      </div>
        <div id="settings" className="settingBlock">
          <div id="settingsNewPage" className="settings-checkbox-option" onClick={this.toggleSettingsNewPage}>
            <input type="checkbox" className="settings-checkbox"></input>
            <div className="settings-checkbox__label">Открывать в новом окне</div>
          </div>
          <div id="settingsNoFollow" className="settings-checkbox-option" onClick={this.toggleSettingsNoFollow}>
            <input type="checkbox" className="settings-checkbox"></input>
            <div className="settings-checkbox__label">Добавить nofollow</div>
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
