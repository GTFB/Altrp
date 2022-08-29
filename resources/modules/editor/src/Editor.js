import React, { Component } from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modules from "./js/classes/Modules";
import WidgetsPanel from "./js/components/WidgetsPanel";
import SettingsPanel from "./js/components/SettingsPanel";
import EditorWindow from "./js/components/EditorWindow";
import HistoryPanel from "./js/components/HistoryPanel";
import NavigationPanel from "./js/components/NavigationPanel";
import CommonPanel from "./js/components/CommonPanel";
import GlobalColors from "./js/components/GlobalColors";
import GlobalEffects from "./js/components/GlobalEffects";
import GlobalFonts from "./js/components/GlobalFonts";
import UpdateButton from "./js/components/UpdateButton";
import CONSTANTS from "./js/consts";
import { stopDrag } from "./js/store/element-drag/actions";
import AssetsBrowser from "./js/classes/modules/AssetsBrowser";
import Arrow from './svgs/arrow.svg';
import DotsDraggable from './svgs/dots-draggable.svg';
import CloseNavigator from './svgs/clear_black.svg';
window.Link = "a";
import store, {
  getCurrentElement,
  getCurrentScreen
} from "../src/js/store/store";

import Logo from "./svgs/logotext.svg";
import Navigation from "./svgs/navigation.svg";
import History from "./svgs/history.svg";
import Preview from "./svgs/preview.svg";
import Settings from "./svgs/settings.svg";
import Dots from "./svgs/dots.svg";
import Hamburger from "./svgs/hamburger.svg";
import { contextMenu } from "react-contexify";
import { closeDynamicContent } from "./js/store/dynamic-content/actions";
import ResponsiveDdFooter from "./js/components/ResponsiveDdFooter";
import { renderAsset } from "../../front-app/src/js/helpers";
import { changeCurrentUser } from "../../front-app/src/js/store/current-user/actions";
import Resource from "./js/classes/Resource";
import AltrpMeta from "./js/classes/AltrpMeta";
import { setEditorMeta } from "./js/store/editor-metas/actions";
import {
  setGlobalColors,
  setGlobalEffects,
  setGlobalFonts
} from "./js/store/altrp-global-colors/actions";
import {setGlobalStylesPresets} from "./js/store/altrp-global-styles/actions";
import { addWidget, filterWidgets } from "./js/store/widgets/actions";
import BaseElement from './js/classes/elements/BaseElement'
import * as ControllersManager from './js/classes/modules/ControllersManager'
import { advancedTabControllers } from './js/decorators/register-controllers'
import Repeater from './js/classes/Repeater'
import EditorWindowPopup from "./js/components/EditorWindowPopup";
import ConditionsPopup from "./js/components/ConditionsPopup";
import {Rnd} from "react-rnd";
import { Resizable } from "re-resizable";
import {io} from "socket.io-client";
import {setGlobalStylesCss} from "./js/store/global-css-editor/actions";
import ReactDOM from "react-dom";
import CssEditorModal from "./js/components/cssEditor/СssEditorModal";
import ImportantStylesManager from "./js/components/ImportantStylesManager";

/**
 * Главный класс редактора.<br/>
 * Реакт-Компонент.<br/>
 * Синглтон, который хранится в глобальной переменной altrpEditor.
 *
 * */
class Editor extends Component {
  /**
   * @constructor
   * */
  constructor(props) {
    super(props);
    window.altrpEditor = this;

    this.BaseElement = BaseElement
    this.ControllersManager = ControllersManager
    this.advancedTabControllers = advancedTabControllers
    this.Repeater = Repeater

    this.state = {
      // activePanel: 'widgets',
      activePanel: "settings",
      templateStatus: CONSTANTS.TEMPLATE_UPDATED,
      showDialogWindow: false,
      hidePanel: false,
      navigator: false,
      resizeNavigator: false,
      cssEditor: false
    };
    this.effectRef = React.createRef();
    this.openPageSettings = this.openPageSettings.bind(this);
    this.showSettingsPanel = this.showSettingsPanel.bind(this);
    this.showNavigationPanel = this.showNavigationPanel.bind(this);
    this.showHistoryPanel = this.showHistoryPanel.bind(this);
    this.showWidgetsPanel = this.showWidgetsPanel.bind(this);
    this.showCommonPanel = this.showCommonPanel.bind(this);
    this.showGlobalColorsPanel = this.showGlobalColorsPanel.bind(this);
    this.showGlobalFontsPanel = this.showGlobalFontsPanel.bind(this);
    this.showGlobalEffectsPanel = this.showGlobalEffectsPanel.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onClick = this.onClick.bind(this);
    // store.subscribe(this.templateStatus.bind(this));
  }
  /**
   * Метод подписчик на изменение состояния Редактора из Редакс хранилища
   * */
  // templateStatus() {
  //   let templateStatus = store.getState().templateStatus.status;
  //   if (templateStatus !== this.state.templateStatus) {
  //     this.setState({ ...this.state, templateStatus });
  //   }
  // }

  /**
   * Инициализация модулей
   */

  initModules() {
    this.modules = new Modules(this);
    this.modules.loaded();
  }

  /**
   * Показывает панель со списком виджетов
   */
  showWidgetsPanel() {
    this.setState({
      ...this.state,
      activePanel: "widgets"
    });
  }

  /**
   * Показывает Dialog окно
   */
  toggleModalWindow() {
    this.setState({
      showDialogWindow: !this.state.showDialogWindow
    });
  }

  // Подключение вебсокетов
  async getConnect(currentUser) {
    if(currentUser.guid && !this.altrpIo) {
      this.altrpIo = io( {
        path: '/wsaltrp',
        auth: {
          key: currentUser.guid,
        },
      })
      this.altrpIo.on("message", (data) => {
        console.log(data)
      })
    }
  }

  /**
   * Показывает панель с настройками текущего виджета
   */
  showSettingsPanel() {
    this.setState({
      ...this.state,
      activePanel: "settings"
    });
  }
  /**
   * Показывает панель с деревом компоненов
   */
  showNavigationPanel() {
    this.setState({
      ...this.state,
      activePanel: "navigation"
    });
  }

  showHistoryPanel() {
    this.setState({
      ...this.state,
      activePanel: "history"
    });
  }

  showCommonPanel() {
    this.setState({
      ...this.state,
      activePanel: "common"
    });
  }

  showGlobalColorsPanel() {
    this.setState({
      ...this.state,
      activePanel: "global_colors"
    });
  }

  showGlobalFontsPanel() {
    this.setState({
      ...this.state,
      activePanel: "global_fonts"
    });
  }

  showGlobalEffectsPanel() {
    this.setState({
      ...this.state,
      activePanel: "global_effects"
    });
  }

  /**
   * Сработывает при клике
   */
  onClick() {
    contextMenu.hideAll();
    store.dispatch(closeDynamicContent());
  }

  /**
   * Обработчик события конец переноса вызывает метод stopDrag переносимого элемента
   * @see ElementWrapper.stopDrag
   */
  onDragEnd() {
    let draggableElement = store.getState().elementDrag.element;
    if (draggableElement && draggableElement.stopDrag) {
      draggableElement.stopDrag();
    }
    store.dispatch(stopDrag());
  }
  /**
   * Вызывается после загрузки шаблона
   * @see {@link SaveImportModule}
   * */
  endLoading() {
    console.log("editor loaded");
  }


  /**
   * Вызывается после загрузки компонента
   * @see {@link https://ru.reactjs.org/docs/react-component.html#componentdidmount}
   * */
  async componentDidMount() {
    this.initModules();
    let stylesCssEditor = await AltrpMeta.getMetaByName("global_styles_editor");
    appStore.dispatch(setGlobalStylesCss(stylesCssEditor.getMetaValue("")))

    let currentUser = await new Resource({
      route: "/ajax/current-user"
    }).getAll();
    currentUser = currentUser.data;

    this.getConnect(currentUser)
    appStore.dispatch(changeCurrentUser(currentUser));
    const presetColors = await AltrpMeta.getMetaByName("preset_colors");
    let presetGlobalStyles = await AltrpMeta.getMetaByName("global_styles");
    appStore.dispatch(setEditorMeta(presetColors));
    const globalStyles = await new Resource({
      route: "/admin/ajax/global_template_styles"
    }).getAll();
    //global colors
    appStore.dispatch(
      setGlobalStylesPresets(presetGlobalStyles.getMetaValue({}))
    );

    appStore.dispatch(
      setGlobalColors(
        globalStyles.color?.map(color => ({
          id: color.id,
          guid: color.guid,
          ...color.settings
        })) || []
      )
    );
    //global effects
    appStore.dispatch(
      setGlobalEffects(
        globalStyles.effect?.map(effect => ({
          id: effect.id,
          guid: effect.guid,
          ...effect.settings
        })) || []
      )
    );
    //global fonts
    appStore.dispatch(
      setGlobalFonts(
        globalStyles.font?.map(font => ({
          id: font.id,
          guid: font.guid,
          ...font.settings
        })) || []
      )
    );
    _.set(window, 'altrp.editorLoaded', true)
    const EditorLoadedEvent = new Event('altrp-editor-loaded')
    window.dispatchEvent(EditorLoadedEvent);
  }

  /**
   * Выбирает корневой элемент текущим и открывает панель настроек
   */

  openPageSettings() {
    this.modules.templateDataStorage.setCurrentRootElement();
    this.showSettingsPanel();
  }

  navigatorPanel = (e) => {
    switch(e.currentTarget.dataset.navigator) {
      case 'open-sidebar':
        this.modules.templateDataStorage.setCurrentRootElement();
        if (!this.state.navigator) {
          this.showNavigationPanel()
          this.setState(state => ({
            ...state,
            resizeNavigator: true
          }))
        } else {
          this.setState(state => ({
            ...state,
            resizeNavigator: true,
            navigator: false
          }));
        }
        break
      case 'close-sidebar':
        this.showSettingsPanel()
        this.setState(state => ({
          ...state,
          resizeNavigator: false
        }))
        break
      case 'open-draggable':
        this.modules.templateDataStorage.setCurrentRootElement();
        this.setState(state => ({
          ...state,
          resizeNavigator: false,
          navigator: true
        }));
        break
      case 'close-draggable':
        this.showSettingsPanel()
        this.setState(state => ({
          ...state,
          navigator: false
        }));
        break
    }
  }

  addWidget(element, component) {
    window.appStore.dispatch(addWidget({element, component}))
  }

  /**
   * Method accepts a function that changes the list of widgets
   */
  filterWidgets(fn) {
    window.appStore.dispatch(filterWidgets(fn))
    window.controllersManager.init()
  }

  toggleHidePanel = () => {
    this.setState(state => ({
      ...state,
      hidePanel: !state.hidePanel
    }))
    const root = document.querySelector(':root')
    let hide = !this.state.hidePanel ? 'hide' : 'noHide';

    const components = [
      'transform-panel',
      'width-padding',
      'width-editor',
    ]

    components.forEach(component => {
      root.style.setProperty(
        `--${component}-default`,
        `var(--${component}-${hide})`
      );
    });
  }

  toggleCssEditor = () => {
    this.setState(state => ({
      ...state,
      cssEditor: !state.cssEditor
    }))
  }

  /**
   * Отрисовка Компонента
   */
  render() {
    let settingsActive = "";
    let navigationActive = "";
    let templateClasses = `editor editor_${
      store.getState().templateData.template_type
    }`;
    if (this.props.templateStatus === CONSTANTS.TEMPLATE_SAVING) {
      templateClasses += " editor_saving";
    }
    if (
      store.getState().currentElement.currentElement.getType &&
      store.getState().currentElement.currentElement.getType() ===
        "root-element" &&
      this.state.activePanel === "settings"
    ) {
      settingsActive = " active";
    }
    if (
      store.getState().currentElement.currentElement.getType &&
      store.getState().currentElement.currentElement.getType() ===
        "root-element" &&
      this.state.activePanel === "navigation"
    ) {
      navigationActive = " active";
    }
    return (
      <DndProvider backend={HTML5Backend}>

        <div
          className={templateClasses}
          onClick={this.onClick}
          onDragEnd={this.onDragEnd}
          onKeyDown={this.onKeyDown}
        >
          <div className="left-panel">
            <div className="editor-top-panel">
              <button
                className="btn btn_hamburger"
                onClick={this.showCommonPanel}
              >
                <Hamburger className="icon" />
              </button>
              <a href="/admin/templates" target="_blank" className="logo">
                {window.admin_logo ? (
                  renderAsset(window.admin_logo, { className: "editor__logo" })
                ) : (
                  <Logo className="editor__logo" />
                )}
              </a>
              <button className="btn btn_dots" onClick={this.showWidgetsPanel}>
                <Dots className="icon" />
              </button>
            </div>
            <div className="left-panel-main">
              {this.state.activePanel === "widgets" && <WidgetsPanel />}
              {this.state.activePanel === "settings" && <SettingsPanel />}
              {this.state.activePanel === "history" && <HistoryPanel />}
              {this.state.activePanel === "navigation" &&  <SettingsPanel />}
              {this.state.activePanel === "common" && (
               <div style={{width: "100%"}}>
                 <CommonPanel
                   showGlobalColorsPanel={this.showGlobalColorsPanel}
                   showGlobalFontsPanel={this.showGlobalFontsPanel}
                   showGlobalEffectsPanel={this.showGlobalEffectsPanel}
                 />
                 {this.state.cssEditor && (
                   ReactDOM.createPortal(<CssEditorModal toggleCssEditor={this.toggleCssEditor}/>, document.body)
                 )}
                 <div style={{textAlign: 'center'}}>
                   <button onClick={this.toggleCssEditor} className="btn-css-save">Open css editor</button>
                 </div>
               </div>
              )}
              {this.state.activePanel === "global_colors" && <GlobalColors />}
              {this.state.activePanel === "global_fonts" && <GlobalFonts />}
              {this.state.activePanel === "global_effects" && <GlobalEffects />}
            </div>
            <div className="editor-bottom-panel d-flex align-content-center justify-center">
              <button
                className={"btn btn_settings" + settingsActive}
                onClick={this.openPageSettings}
              >
                <Settings className="icon" />
              </button>
              <button
                data-navigator="open-sidebar"
                className={"btn btn_settings" + navigationActive}
                onClick={this.navigatorPanel}
              >
                <Navigation className="icon" />
              </button>
              <button className="btn " onClick={this.showHistoryPanel}>
                <History className="icon" />
              </button>
              <div className="btn ">
                <ResponsiveDdFooter />
              </div>
              <button className="btn ">
                <Preview className="icon" />
              </button>
              <UpdateButton
                onClick={() => this.toggleModalWindow()}
                toggleModalWindow={() => this.toggleModalWindow()}
              />
            </div>
            <div onClick={this.toggleHidePanel} className="panel-click">
              <Arrow width={20} height={14} className={`panel-arrow${this.state.hidePanel ? ' panel-arrow-hide' : ''}`} />
            </div>
          </div>
          <div className="right-panel" >
            {this.state.showDialogWindow && (
              // <DialogWindow
              //   state={this.state.showDialogWindow}
              //   toggleModalWindow={() => this.toggleModalWindow()}
              // />
              <EditorWindowPopup
                activeMode={this.state.showDialogWindow}
                toggleModalWindow={() => this.toggleModalWindow()}
              >
                <ConditionsPopup/>
              </EditorWindowPopup>
            )}
            <EditorWindow />
            <Rnd
              className={this.state.navigator ? "draggable-navigator" : "draggable-navigator-hide"}
              default={{
                x: 400,
                y: 100,
                width: 350,
                height: 600,
              }}
              minWidth={350}
              minHeight={600}
              maxWidth={1000}
              maxHeight={800}
              bounds="body"
              resizeHandleStyles={{bottom: {height: '30px', bottom: '0'}}}
            >
              <div className="draggable-popup">
                <div className="draggable-popup-top">
                  <h2 className="title-navigator">Navigator</h2>
                  <CloseNavigator onClick={this.navigatorPanel} data-navigator="close-draggable" width={16} height={16} className="exit-navigator"/>
                </div>
                <div className="draggable-popup-center">
                  {this.state.navigator && (
                    <NavigationPanel />
                  )}
                </div>
                <div className="draggable-popup-bottom">
                  <DotsDraggable width={16} height={16} className="dots-draggable"/>
                </div>
              </div>
            </Rnd>
          </div>
          <Resizable
            className={this.state.resizeNavigator ? 'right-panel-sidebar-open' : 'right-panel-sidebar-hide'}
            defaultSize={{
              width: 270,
              height: '100vh',
            }}
            minWidth={270}
            maxWidth={750}
            enable={{top:false, right:false, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
          >
            <div className="right-panel-sidebar">
              <div className='right-panel-sidebar-top'>
                <h2 className="right-panel-sidebar-title">Navigator</h2>
                <CloseNavigator data-navigator="close-sidebar" onClick={this.navigatorPanel} width={20} height={20} className="exit-sidebar-navigator"/>
              </div>
              <div className='right-panel-sidebar-center'>
                {this.state.resizeNavigator && (
                  <NavigationPanel  />
                )}
              </div>
              <div className='right-panel-sidebar-bottom'>
                <button
                  onClick={this.navigatorPanel}
                  data-navigator="open-draggable"
                  className="open-draggable-navigator"
                >
                  Open draggable navigator
                </button>
              </div>
            </div>
          </Resizable>
        </div>
        <AssetsBrowser rawEnable={true}/>
         <ImportantStylesManager/>
      </DndProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    templateStatus: state.templateStatus.status,
    primarySections: state.primarySections,
  };
}

/**
 * Если разработка то включается HMR <br/>
 * По умолчанию просто компонент
 * @member _export
 */
let _export;
if (process.env.NODE_ENV === "production") {
  _export = Editor;
} else {
  _export = hot(module)(connect(mapStateToProps)(Editor));
}

export default _export;
