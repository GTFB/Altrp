import React, {Component} from "react";
import {hot} from "react-hot-loader/index";
import NewSection from "./js/components/NewSection";
import {getEditor} from "./js/helpers";
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import store from '../src/js/store/store'
import RootElement from "./js/classes/elements/RootElement";
import Styles from "./js/components/Styles";
import {contextMenu} from "react-contexify/lib/index";
import ElementContextMenu from "./js/components/ElementContextMenu";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import './js/components/altrp-carousel/altrp-carousel.scss';
import './js/components/altrp-lightbox/altrp-lightbox.scss';
import 'react-image-lightbox/style.css';

// console.log('dsaf');


class EditorContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.editorWindow = React.createRef();
    store.subscribe(this.currentElementListener.bind(this));
    window.altrpEditorContent = this;
  }

  currentElementListener(data){
    let currentElement = store.getState().currentElement.currentElement;
    if(currentElement instanceof RootElement && currentElement !== this.state.rootElement){
      this.setState({
        rootElement: currentElement,
      })
    }
  }

  // log(e){
  //   e.preventDefault();
  //   console.log(e);
  // }
  //
  // onDragOver (e) {
  //   let event = e ;
  //   event.stopPropagation();
  // }
  //
  // onDragEnter  (e) {
  //   let event = e ;
  //   event.stopPropagation();
  // }


  /**
   * Компонент окна редактора загрузился
   * берем корневой элемент и загружаем в окно
   */
  componentDidMount() {
    let rootElement = getEditor().modules.templateDataStorage.getRootElement();
    this.setState({
      rootElement
    });
  }

  /**
   * Сработывает при клике
   */
  onClick(e) {
    contextMenu.hideAll();
  }

  render() {
    return <Provider store={store}>
      <Router>
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
        <Styles/>
        <ElementContextMenu/>
      </Router>
    </Provider>;
  }
}

let _export;
if (process.env.NODE_ENV === 'production') {
  _export = EditorContent
} else {
  _export = hot(module)(EditorContent);
}
export default EditorContent
