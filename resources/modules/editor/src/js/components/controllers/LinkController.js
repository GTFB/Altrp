import {controllerMapStateToProps} from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import SettingsIcon from '../../../svgs/settings.svg'
import controllerDecorate from "../../decorators/controller";

class LinkController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.settings = this.settings.bind(this);
    this.toggleSettingsNewPage = this.toggleSettingsNewPage.bind(this);
    this.toggleSettingsNoFollow = this.toggleSettingsNoFollow.bind(this);
    this.changeAttribute = this.changeAttribute.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.changeTag = this.changeTag.bind(this);
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || {};
    value.tag = value.tag || 'Link';
    this.state = {
      value,
      toPrevPage: false,
      show: true,
      tagsOptions: [
        {
          label: 'a',
          value: 'a',
        },
        {
          label: 'Link',
          value: 'Link',
        },
      ]
    };
  }
  /**
   * Сменить тег
   */
  changeTag(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      tag: e.target.value
    });
  }
  settings() {
    let settings = document.getElementById("settings");
    settings.classList.toggle("settingBlock-none");
  };

  toggleSettingsNewPage(e) {
    let toggleSettingsNewPageCheckbox = e.currentTarget;
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    console.log(value.openInNew);
    this._changeValue({
      ...value,
      openInNew: !value.openInNew
    });

  };

  toggleSettingsNoFollow() {    //TODO: надо порефакторить
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    let togglesettingsNoFollowCheckbox = document.getElementById("togglesettingsNoFollowCheckbox");
    let changeCheckBox = togglesettingsNoFollowCheckbox.hasAttribute("checked");
    if (changeCheckBox == false) {

      this._changeValue({
        ...value,
        noFollow: true
      });
      togglesettingsNoFollowCheckbox.setAttribute("checked", "checked");
    } else {
      togglesettingsNoFollowCheckbox.removeAttribute("checked");
      this._changeValue({
        ...value,
        noFollow: false
      })
    }

  };

  toggleSettingsToPrevPage = e => {
    const value = this.getSettings(this.props.controlId) || this.getDefaultValue();

    this._changeValue({
      ...value,
      toPrevPage: e.target.checked
    });
  };

  changeAttribute(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      attributes: e.target.value
    })
    // console.log(this.state.value.attributes
  }

  changeInput(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      url: e.target.value
    })
  }

  getDefaultValue() {
    return "";
  }

  render() {
    if (this.state.show === false) {
      return '';
    }
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    return <div className="controller-container controller-container_link">
      <div className="control-link-header">
        <div className="controller-container__label">{this.props.label}</div>
      </div>
      <div className="control-link-input-wrapper">
        <input
          onChange={this.changeInput}
          value={value.toPrevPage ? 'On Prev Page' : value.url || ''}
          type="text"
          className="control-link"
          placeholder="введите ссылку"
        />
        <div className="control-link-settings control-link-button" onClick={this.settings}>
          {/* тут есть проблема с размерами, просто нужно убрать width и height в самой svg но есть одна проблема*/}
          <SettingsIcon width="12" />
        </div>
        <div className="control-link-dynamic control-link-button">
          <DynamicIcon width="12" />
        </div>
      </div>
      <div id="settings" className="settingBlock settingBlock-none">
        {/*<div className="control-container_select-wrapper">*/}
        {/*  <div className="controller-container__label control-select__label">*/}
        {/*    Choose Tag*/}
        {/*    </div>*/}
        {/*  <select className="control-select control-field" value={value.tag} onChange={this.changeTag}>*/}
        {/*    {this.state.tagsOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}*/}
        {/*  </select>*/}
        {/*</div>*/}
        <label className="settings-checkbox-option" >
          <input id={`toggleSettingsNewPageCheckbox_${this.props.controlId}`} onChange={this.toggleSettingsNewPage} type="checkbox" checked={value.openInNew} className="settings-checkbox" />
          <span className="settings-checkbox-container" />
          <span className="settings-checkbox__label">Open in New Window</span>
        </label>
        <div className="settings-checkbox-option" onClick={this.toggleSettingsNoFollow}>
          <input id="togglesettingsNoFollowCheckbox" type="checkbox" className="settings-checkbox" />
          <span className="settings-checkbox-container" />
          <label className="settings-checkbox__label">Add nofollow</label>
        </div>
        <div className="settings-checkbox-option">
          <input
            checked={value.toPrevPage}
            id="toPrevPage" type="checkbox"
            className="settings-checkbox"
            onChange={this.toggleSettingsToPrevPage}
          />
          <span className="settings-checkbox-container" />
          <label htmlFor="toPrevPage" className="settings-checkbox__label">On Prev Page</label>
        </div>
        <div className="customAttributes">
          <div className="control-link-header">
            <label className="controller-container__label">Custom Attributes</label>
          </div>
          <input onChange={this.changeAttribute}
            value={value.attributes || ''}
            type="text"
            placeholder="key|value, key|value..."
            className="settings-input-attribute" />
          <p className="settings-attribute-description">Set custom attributes for the link element. Separate attribute keys from values using the | (pipe) character. Separate key-value pairs with a comma.</p>
        </div>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen
  };
}
export default connect(controllerMapStateToProps)(LinkController);
