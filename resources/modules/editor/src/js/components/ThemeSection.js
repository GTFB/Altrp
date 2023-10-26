import React, { Component } from "react";
import ('../../sass/state-section.scss');
import { connect } from "react-redux";
import {setEditorMeta} from "../store/editor-metas/actions";



class ThemeSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buttons: appStore.getState().editorMetas.altrp_themes.getMetaValue().altrpThemes,

    }
  }

  setCurrentTheme(button) {
    const metaValue = appStore.getState().editorMetas.altrp_themes.getMetaValue()
    const currentTheme = metaValue.currentTheme
    if(currentTheme === button.name){
      return
    }


    const altrp_themes = appStore.getState().editorMetas.altrp_themes
    altrp_themes.setProperty('metaValue.currentTheme', button.name)
    appStore.dispatch(setEditorMeta(altrp_themes))
    const frameDocument = _.get(document.getElementById('editorContent'), 'contentWindow.document.documentElement');

    if(frameDocument) {
      if (button.name !== 'altrp-theme_normal') {
        frameDocument.classList.add(button.name)
      } else {
        frameDocument.removeAttribute('class')
      }
    }
  }


  render() {
    const metaValue = appStore.getState().editorMetas.altrp_themes.getMetaValue()
    const currentTheme =metaValue.currentTheme
    return (
      <div className="state-section-wrapper state-section-wrapper_theme">
        <div className="state-section state-section_theme">
          {
            this.state.buttons.map((button, index) => {
              return <button
                key={index}
                className={"state-section__button " + (currentTheme === button.name ? "state-section__button_active" : "")}
                onClick={() => this.setCurrentTheme(button)}
              >{button.title}</button>
            })
          }
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    editorMetas: state.editorMetas
  }
}

export default connect(mapStateToProps, null)(ThemeSection);
