import React, { Component } from "react";
import { isEditor, redirect } from "../../../../front-app/src/js/helpers";
import CONSTANTS from "../consts";
import getDataByPath from "../../../../front-app/src/js/functions/getDataByPath";

// (window.globalDefaults = window.globalDefaults || []).push(`
//   .altrp-section {
//     display: flex;
//     &.altrp-section--boxed > .altrp-element {
//       margin: 0 auto;
//     }
//     &.altrp-section--full-width,
//     &.altrp-section--boxed {
//       width: 100vw;
//     }
//   }
//
//   .altrp-section-full-fill {
//     display: flex;
//     width: 100vh;
//   }
//
//   .altrp-section-full-fill .altrp-section {
//     width: 1400px;
//     margin-left: auto;
//     margin-right: auto;
//   }
//
//   .altrp-section {
//     position: relative;
//     top: auto;
//     right: auto;
//     left: auto;
//     bottom: auto;
//   }
//
//   .altrp-section_section-boxed {
//     padding-left: calc((100vw - 1440px) / 2);
//     padding-right: calc((100vw - 1440px) / 2);
//     width: 100vw;
//   }
// `);

class SectionWidgetComponent extends Component {
  constructor(props) {
    super(props);
    if (!props.children.length) {
      throw `Section Component Must Contain at Least One Column as Child`;
    }
    this.state = {
      children: props.children,
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
  }

  /**
   * Обрабатываем клик по секции
   * @param e
   */
  onClick = e => {
    if (isEditor()) {
      return;
    }
    const sectionLink = this.props.element.getSettings("link_link");
    redirect(sectionLink, e, this.props.element.getCurrentModel().getData());
  };

  /**
   * Курсор для ссылки
   * @return {boolean}
   */
  sectionIsLink() {
    if (isEditor()) {
      return false;
    }
    return !!_.get(this, "props.element.settings.link_link.url");
  }

  render() {
    let styles = {
      maxWidth: "100%"
    };
    const background_image = this.props.element.getSettings(
      "background_image",
      {}
    );
    const background_image_hover = this.props.element.getResponsiveSetting(
      "background_image",
      ":hover",
      {},
    );
    const { isScrollEffect, isFixed } = this.props.element.getSettings();
    const isContentBoxed =
      this.props.element.getSettings().layout_content_width_type === "boxed";
    const widthType = this.props.element.getSettings()
      .layout_content_width_type;
    // if (this.state.settings.layout_content_width_type === "full") {
    //   width = {
    //     width: getWindowWidth() + "px"
    //   }
    // } else {
    //   width = {}
    // }

    let sectionClasses = [
      "altrp-section",
      `altrp-section_columns-${this.props.element.getColumnsCount()}`
    ];
    if (this.sectionIsLink()) {
      sectionClasses.push("altrp-pointer");
    }
    if (background_image?.url || background_image_hover?.url /*  && !isScrollEffect */) {
      sectionClasses.push("altrp-background-image");
    }

    if (widthType === "boxed" && !isFixed) {
      sectionClasses.push("altrp-section_boxed");
      ("DROP ELEMENT");
    }
    if (widthType === "section_boxed" && !isFixed) {
      sectionClasses.push("altrp-section_section-boxed");
      delete styles.maxWidth;
    }

    if (widthType === "full" && !isFixed) {
      sectionClasses.push("altrp-section--full-width");
      delete styles.maxWidth;
    }

    let ElementWrapper = window.SectionElementWrapper || this.props.ElementWrapper || window.ElementWrapper;
    let sectionWrapper = this.state.children.map(column => (
      <ElementWrapper
        ElementWrapper={ElementWrapper}
        key={column.getIdForAction()}
        rootElement={this.props.rootElement}
        baseRender={this.props.baseRender}
        component={column.componentClass}
        element={column}
      />
    ));

    const fitToContent = this.props.element.getResponsiveSetting("layout_height", "", "default")
    if (fitToContent === "fit") {
      sectionClasses.push("section-fit-to-content");
    }
    if (this.props.currentScreen.name !== CONSTANTS.DEFAULT_BREAKPOINT) {
      styles.flexWrap = "wrap";
    }
    const layout_html_tag =
      this.props.element.getSettings("layout_html_tag") || "div";

    let path_image = this.props.element.getSettings('path_image')
    if(path_image){
      path_image = getDataByPath(path_image, this.element.getCardModel())
    }
    if(path_image){
      styles.backgroundImage = `url("${path_image}")`
    }
    return React.createElement(
      layout_html_tag,
      {
        style: styles,
        className:
          sectionClasses.join(" ") +
          " " +
          (this.isActive() ? 'active ' : '') +
          this.state.settings.position_style_css_classes,
        id: "",
        onClick: this.onClick,
        settings: this.props.element.getSettings()
      },
      sectionWrapper
    );
  }
}

export default SectionWidgetComponent;
