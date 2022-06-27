import React, {Component} from "react";
import NewSection from "./js/components/NewSection";
import {getEditor} from "./js/helpers";
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import store from '../src/js/store/store'
import RootElement from "./js/classes/elements/RootElement";
import Styles from "./js/components/Styles";
import {contextMenu} from "react-contexify";
import ElementContextMenu from "./js/components/ElementContextMenu";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import './js/components/altrp-carousel/altrp-carousel.scss';
import './js/components/altrp-lightbox/altrp-lightbox.scss';
import './js/components/altrp-menu/altrp-menu.scss';
import './sass/editor-content.scss';
import {changeCurrentModel} from "../../front-app/src/js/store/current-model/actions";
import FontsManager from "../../front-app/src/js/components/FontsManager";
import  { StyleSheetManager } from 'styled-components';
import {HTML5Backend} from "react-dnd-html5-backend";
import { DndProvider, } from 'react-dnd'
import frontElementsManager from '../../front-app/src/js/classes/FrontElementsManager.js'
import GlobalStyles from "../../front-app/src/js/components/GlobalStyles";
import '../../front-app/src/js/libs/reacket'
import Scrollbars from "react-custom-scrollbars";
import applyGlobalCss from "./js/helpers/applyGlobalCss";

window.Link = 'a';
frontElementsManager.loadAllComponents();
class EditorContent extends Component {
  constructor(props) {
    super(props);

    this.editorWindow = React.createRef();
    store.subscribe(this.currentElementListener.bind(this));
    store.subscribe(this.templateStatus.bind(this));
    window.altrpEditorContent = this;
    store.subscribe(this.onStoreUpdate)
  }

  onStoreUpdate = ()=>{
    if(this.widgetsManager !== store.getState().widgetsManager){

      const needLoad = ! ! this.widgetsManager
      const { widgetsManager} = store.getState()
      this.widgetsManager = widgetsManager
      const { saveImportModule} = getEditor().modules
      if(needLoad){
        saveImportModule.load()
      }
    }
  }
  /**
   * Метод-подписчик на изменение состояния Редактора из Редакс хранилища
   * */
  templateStatus() {
    let templateStatus = store.getState().templateStatus.status;
    if (templateStatus !== this.state.templateStatus) {
      this.setState({ ...this.state, templateStatus });
    }
  }

  /**
   * Метод-подписчик на изменение текущего элемента из Редакс хранилища
   * */
  currentElementListener(){
    let currentElement = store.getState().currentElement.currentElement;
    if(currentElement instanceof RootElement && currentElement !== this.state.rootElement){
      this.setState({
        rootElement: currentElement,
      })
    }
  }

  /**
   * Компонент окна редактора загрузился
   * берем корневой элемент и загружаем в окно
   */
  componentDidMount() {
    let rootElement = getEditor().modules.templateDataStorage.getRootElement();
    store.dispatch(changeCurrentModel({altrpModelUpdated: true}));
    this.setState({
      rootElement
    });
    applyGlobalCss()
  }

  /**
   * Сработывает при клике
   */
  onClick(e) {
    contextMenu.hideAll();
  }
  render() {

    return <Provider store={store}>
      <StyleSheetManager target={EditorFrame.contentWindow.document.getElementsByTagName(
          "head"
      )[0]}>
        <Router>
          <DndProvider backend={HTML5Backend}>
            <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
              <div className="editor-content d-flex flex-column justify-center align-content-center"
                   onClick={this.onClick}
                   ref={this.editorWindow}>
                {
                  this.state.rootElement ? React.createElement(
                    this.state.rootElement.componentClass,{
                      children: this.state.rootElement.children,
                      element:this.state.rootElement,
                    }
                  ) : ''
                }
                <NewSection />
              </div>
            </Scrollbars>
          </DndProvider>
          {store.getState().templateData.template_type !== 'email' && <Styles/>}
          <ElementContextMenu/>
          <GlobalStyles/>
        </Router>
      </StyleSheetManager>
      <FontsManager />
    </Provider>;
  }
}


export default EditorContent
