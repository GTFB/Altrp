import React, {Component} from "react";
import './sass/editor-style.scss';
import {hot} from "react-hot-loader";
import Modules from "./js/classes/Modules";
import WidgetsPanel from "./js/components/WidgetsPanel";
import SettingsPanel from "./js/components/SettingsPanel";
import EditorWindow from "./js/components/EditorWindow";
import DesktopIcon from './svgs/desktop.svg';
import Logo from './svgs/logo.svg';
import Navigation from './svgs/navigation.svg';
import History from './svgs/history.svg';
import Preview from './svgs/preview.svg';
import Settings from './svgs/settings.svg';
import Dots from './svgs/dots.svg';
import Hamburger from './svgs/hamburger.svg';
import {Provider} from 'react-redux'
import store from '../src/js/store/store'
import HistoryPanel from "./js/components/HistoryPanel";
import UpdateButton from "./js/components/UpdateButton";
import {CONSTANTS} from "./js/helpers";
import Styles from "./js/components/Styles";

class Editor extends Component {

  constructor(props) {
    super(props);
    window.altrpEditor = this;
    this.state = {
      // activePanel: 'widgets',
      activePanel: 'settings',
    };
    this.openPageSettings = this.openPageSettings.bind(this);
    this.showSettingsPanel = this.showSettingsPanel.bind(this);
    this.showWidgetsPanel = this.showWidgetsPanel.bind(this);
    store.subscribe(this.templateStatus.bind(this));
  }
  templateStatus(){
    let templateStatus = store.getState().templateStatus.status;
    this.setState({...this.state, templateStatus})
  }
  initModules() {
    this.modules = new Modules(this);
    this.modules.loaded();
  }

  showWidgetsPanel() {
    this.setState({
      activePanel: 'widgets'
    })
  }

  showSettingsPanel() {
    this.setState({
      activePanel: 'settings'
    })
  }
  endLoading(){
    console.log('editor loaded');
  }
  componentDidMount() {
    this.initModules();
  }

  openPageSettings() {
    this.modules.templateDataStorage.setCurrentRootElement();
    this.showSettingsPanel();
  }

  render() {
    let settingsActive = '';
    let templateClasses = 'editor ';
    if(this.state.templateStatus === CONSTANTS.TEMPLATE_SAVING){
      templateClasses += ' editor_saving';
    }
    if(store.getState().currentElement.currentElement.getType &&
        store.getState().currentElement.currentElement.getType() === 'root-element' &&
      this.state.activePanel === 'settings'
    ){
      settingsActive = ' active';
    }
    return (
        <Provider store={store}>
            <div className={templateClasses}>
              <div className="left-panel">
                <div className="editor-top-panel">
                  <button className="btn btn_hamburger"
                          // onClick={this.showSettingsPanel}
                  >
                    <Hamburger className="icon"/>
                  </button>
                  <div className="logo"><Logo viewBox="0 0 97 35"/></div>
                  <button className="btn btn_dots" onClick={this.showWidgetsPanel}>
                    <Dots className="icon"/>
                  </button>
                </div>
                <div className="left-panel-main">
                  {
                    (this.state.activePanel === 'widgets') &&
                    <WidgetsPanel/>
                  }
                  {
                    (this.state.activePanel === 'settings') &&
                    <SettingsPanel/>
                  }
                </div>
                <div className="editor-bottom-panel d-flex align-content-center justify-center">
                  <button className={'btn btn_settings' + settingsActive} onClick={this.openPageSettings}>
                    <Settings className="icon"/>
                  </button>
                  <button className="btn ">
                    <Navigation className="icon"/>
                  </button>
                  <button className="btn ">
                    <History className="icon"/>
                  </button>
                  <button className="btn ">
                    <DesktopIcon className="icon"/>
                  </button>
                  <button className="btn ">
                    <Preview className="icon"/>
                  </button>
                  <UpdateButton/>
                </div>
              </div>
              <div className="right-panel">
                <EditorWindow  />
              </div>
            </div>
          <Styles/>
        </Provider>
    );
  }

}

let _export;
if (process.env.NODE_ENV === 'production') {
  _export = Editor;
} else {
  _export = hot(module)(Editor);
}

export default _export;
