import React, {Component} from "react";
import '../../sass/column.scss'
import {isEditor, redirect} from "../../../../front-app/src/js/helpers";
import {
  ColumnArticleComponent,
  ColumnAsideComponent,
  ColumnDivComponent, ColumnFooterComponent, ColumnHeaderComponent, ColumnMainComponent,
  ColumnNavComponent, ColumnSectionComponent
} from "./widgets/styled-components/ColumnComponents";

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
    if(props.baseRender){
      this.render = props.baseRender(this);
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

  /**
   * Курсор для ссылки
   * @return {boolean}
   */
  columnIsLink(){
    return ! ! _.get(this, 'props.element.settings.link_link.url');
  }

  render(){
    const background_image = this.props.element.getSettings('background_image', {});
    let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
    let className = "altrp-column " + (this.state.settings.position_style_css_classes || "") + (background_image.url ? ' altrp-background-image' : '');
    if(this.columnIsLink()){
      className += ' altrp-pointer';
    }

    const layout_html_tag = this.props.element.getSettings('layout_html_tag') || 'div';

    let component = ColumnDivComponent;

    switch(layout_html_tag){
      case 'aside': {
        component = ColumnAsideComponent;
      }break;
      case 'nav': {
        component = ColumnNavComponent;
      }break;
      case 'section': {
        component = ColumnSectionComponent;
      }break;
      case 'article': {
        component = ColumnArticleComponent;
      }break;
      case 'main': {
        component = ColumnMainComponent;
      }break;
      case 'footer': {
        component = ColumnFooterComponent;
      }break;
      case 'header': {
        component = ColumnHeaderComponent;
      }break;
    }

    return React.createElement(component,
      {
        className ,
        id :this.state.settings.position_style_css_id || "",
        onClick: this.onClick,
        settings: this.props.element.getSettings()
      },
      this.state.children.map(
        widget => <ElementWrapper key={widget.getIdForAction()}
                                  rootElement={this.props.rootElement}
                                  baseRender={this.props.baseRender}
                                  ElementWrapper={ElementWrapper}
                                  component={widget.componentClass}
                                  element={widget}/>
      )
    );
  }
}

export default ColumnComponent