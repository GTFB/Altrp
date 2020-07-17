import React, {Component} from "react";
import {connect} from 'react-redux';
import ContentIcon from '../../svgs/content.svg'
import StyleIcon from '../../svgs/style.svg'
import AdvancedIcon from '../../svgs/advanced.svg'
import {TAB_ADVANCED, TAB_CONTENT, TAB_STYLE} from "../classes/modules/ControllersManager";
import PanelTabContent from "./PanelTabContent";
import DynamicContent from "./DynamicContent/DynamicContent";
import Controller from "../classes/Controller";

class SettingsPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'content',
    };
  }

  /**
   * Устанавливает текущий таб
   * @param activeTab
   */
  setActiveTab(activeTab) {
    this.setState({
      ...this.state, activeTab
    })
  }

  render() {

    let controllersManager = window.controllersManager;

    let sections = [];
    let sectionStyle = [];
    if (this.props.currentElement.getName) {
      sections = controllersManager.getControls(this.props.currentElement.getName())[this.state.activeTab] || [];
      sections.forEach(section => {
        section.controls = section.controls.map(control => {
          control.controller = new Controller(control);
          return control;
        });
      });
      sectionStyle = controllersManager.getControls(this.props.currentElement.getName())['style'] || [];
      sectionStyle.forEach(section => {
        section.controls = section.controls.map(control => {
          control.controller = new Controller(control);
          return control;
        });
      });
    }

    // let sections = this.props.currentElement.getControllers ?
    let contentTabClasses = 'panel-tab d-flex ' + (this.state.activeTab === TAB_CONTENT ? 'active' : '');
    let styleTabClasses = 'panel-tab d-flex ' + (this.state.activeTab === TAB_STYLE ? 'active' : '');
    let advancedTabClasses = 'panel-tab d-flex ' + (this.state.activeTab === TAB_ADVANCED ? 'active' : '');
    return <div className="panel settings-panel d-flex">
      <div className="panel-tabs d-flex">
        <button className={contentTabClasses} onClick={() => this.setActiveTab(TAB_CONTENT)}>
          <span className="panel-tab__icon">
            <ContentIcon/>
          </span>
          <span className="panel-tab__text">
            Content
          </span>
        </button>
        <button className={styleTabClasses} onClick={() => this.setActiveTab(TAB_STYLE)}>
          <span className="panel-tab__icon">
            <StyleIcon/>
          </span>
          <span className="panel-tab__text">
            Style
          </span>
        </button>
        <button className={advancedTabClasses} onClick={() => this.setActiveTab(TAB_ADVANCED)}>
          <span className="panel-tab__icon">
            <AdvancedIcon/>
          </span>
          <span className="panel-tab__text">
            Advanced
          </span>
        </button>
      </div>
      <PanelTabContent sections={sections}/>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement
  };
}

export default connect(mapStateToProps)(SettingsPanel);
