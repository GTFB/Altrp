import React, {Component} from "react";
import '../../sass/column.scss'
import {isEditor, redirect} from "../../../../front-app/src/js/helpers";

class ColumnComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      children: props.children || [],
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
    this.columnCount = 0
  }

  /**
   * Обрабатываем клик по секции
   * @param e
   */
  onClick = (e) => {
    if(isEditor()){
      return;
    }
    const columnLink = this.props.element.getSettings('link_link');
    redirect(columnLink, e, this.props.element.getCurrentModel().getData());
  };

  render(){
    const background_image = this.props.element.getSettings('background_image', {});
    let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;

    return React.createElement(this.state.settings.layout_html_tag || "div",
      {
        className: "altrp-column " + (this.state.settings.position_style_css_classes || "") + (background_image.url ? ' altrp-background-image' : ''),
        id :this.state.settings.position_style_css_id || "",
        onClick: this.onClick,
      },
      this.state.children.map(
        widget => <ElementWrapper key={widget.getIdForAction()}
                                  rootElement={this.props.rootElement}
                                  ElementWrapper={ElementWrapper}
                                  component={widget.componentClass}
                                  element={widget}/>
      )
    );
  }
}

export default ColumnComponent