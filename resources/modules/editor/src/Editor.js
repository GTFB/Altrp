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
import Chevron from './svgs/chevron.svg';
import History from './svgs/history.svg';
import Preview from './svgs/preview.svg';
import Settings from './svgs/settings.svg';
import Dots from './svgs/dots.svg';
import Hamburger from './svgs/hamburger.svg';
import HistoryPanel from "./js/components/HistoryPanel";

class Editor extends Component {

  constructor(props) {
    super(props);
    this.initModules();
    this.state = {
      activePanel: 'widgets',
    };
    }

  initModules() {
    this.modules = new Modules();
  }

  showWidgetsPanel(){
    this.setState({
      activePanel: 'widgets'
    })
  }

  showSettingsPanel(){
    this.setState({
      activePanel: 'settings'
    })
  }

  render() {
    return (
        <div className="editor">
          <div className="left-panel">
            <div className="editor-top-panel">
              <button className="btn btn_hamburger" onClick={this.showSettingsPanel.bind(this)}>
                <Hamburger className="icon"/>
              </button>
              <div className="logo"><Logo viewBox="0 0 97 35"/></div>
              <button className="btn btn_dots" onClick={this.showWidgetsPanel.bind(this)}>
                <Dots className="icon"/>
              </button>
            </div>
            <div className="left-panel-main">
              {
                (this.state.activePanel === 'widgets') &&
                <WidgetsPanel />
              }
              {
                (this.state.activePanel === 'settings') &&
                <SettingsPanel />
              }
            </div>
            <div className="editor-bottom-panel d-flex align-items-center justify-center">
              <button className="btn btn_settings">
                <Settings className="icon" />
              </button>
              <button className="btn ">
                <Navigation className="icon" />
              </button>
              <button className="btn ">
                <History className="icon" />
              </button>
              <button className="btn ">
                <DesktopIcon className="icon" />
              </button>
              <button className="btn ">
                <Preview className="icon" />
              </button>
              <div className="control-group d-flex">
                <button className="btn btn_disabled btn_grey font_montserrat font_500">
                  UPDATE
                </button>
                <button className="btn btn_grey">
                  <Chevron className="icon"/>
                </button>
              </div>
            </div>
          </div>
          <div className="right-panel">
            <EditorWindow parent={this}/>
          </div>
        </div>
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
