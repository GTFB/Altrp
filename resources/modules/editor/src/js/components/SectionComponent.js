import React, { Component } from "react";
import '../../sass/section.scss';
import { connect } from "react-redux";
import '../../sass/section.scss'
import {isEditor, redirect} from "../../../../front-app/src/js/helpers";

class SectionComponent extends Component {
  constructor(props) {
    super(props);
    if (!props.children.length) {
      throw `Section Component Must Contain at Least One Column as Child`;
    }
    this.state = {
      children: props.children,
      settings: props.element.getSettings(),
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  /**
   * Обрабатываем клик по секции
   * @param e
   */
  onClick = (e) => {
    if(isEditor()){
      return;
    }
    const sectionLink = this.props.element.getSettings('link_link');
    redirect(sectionLink, e, this.props.element.getCurrentModel().getData());
  };

  /**
   * Курсор для ссылки
   * @return {boolean}
   */
  sectionIsLink(){
    if(isEditor()){
      return false;
    }
    return ! ! _.get(this, 'props.element.settings.link_link.url');
  }

  render() {
    let styles = {};
    const  background_image  = this.props.element.getSettings('background_image', {});
    const { isScrollEffect, isFixed } = this.props.element.getSettings();
    const isContentBoxed = this.props.element.getSettings().layout_content_width_type === "boxed";
    const widthType = this.props.element.getSettings().layout_content_width_type;
    // if (this.state.settings.layout_content_width_type === "full") {
    //   width = {
    //     width: getWindowWidth() + "px"
    //   }
    // } else {
    //   width = {}
    // }


    let sectionClasses = [
      'altrp-section',
      `altrp-section_columns-${this.props.element.getColumnsCount()}`
    ];
    if(this.sectionIsLink()){
      sectionClasses.push('altrp-pointer');
    }
    if (background_image.url/*  && !isScrollEffect */) {
      sectionClasses.push('altrp-background-image');
    }

    if (widthType === "boxed" && !isFixed) {
      sectionClasses.push('altrp-section_boxed');
    }
    if (widthType === "section_boxed" && !isFixed) {
      sectionClasses.push('altrp-section_section-boxed');
    }

    if (widthType === "full" && !isFixed) {
      sectionClasses.push('altrp-section--full-width');
    }

    let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
    let sectionWrapper = this.state.children.map(column => (
      <ElementWrapper
          ElementWrapper={ElementWrapper}
          key={column.getIdForAction()}
          rootElement={this.props.rootElement}
          component={column.componentClass}
          element={column}
      />
    ));


    if (this.state.settings.layout_height === "fit") {
      styles.height = "100vh"
    }

    return React.createElement(this.state.settings.layout_html_tag || "div",
      { style: styles,
        className: sectionClasses.join(' ') + " " + this.state.settings.position_style_css_classes, id: "" ,
        onClick: this.onClick,
      },
      // isScrollEffect ?
      // <>
      //   <div className="motion-effects-container" onScroll={this.handleScroll}>
      //       <div className="altrp-background-image" style={{ width: '100%', height: '130%', transform: 'translateY(110px)' }} />
      //   </div>
      //   <div className={"get-column-count " + `altrp-element-column-count${this.props.element.id}`} id="columnCount" />
      // </> :
      /*<div className={"get-column-count " + `altrp-element-column-count${this.props.element.id}`} id="columnCount" />,*/
      sectionWrapper
    );

    // let fullFill = null
    // if(this.state.settings.layout_content_width_type == "full-fill") {
    //   fullFill = section
    //   // <div className="full-fill" style={{width: getWindowWidth() + "px"}}>{section}</div>
    // }

  }
}

function mapStateToProps(state) {
  return {
    changeWidthColumns: state.columnWidth,
  };
}
// export default connect(mapStateToProps, null, null, {
//   forwardRef: true
// })(SectionComponent);
export default SectionComponent;
