import React, { Component } from "react";
import { isEditor, redirect } from "../../../../front-app/src/js/helpers";
import CONSTANTS from "../consts";
import {
  SectionArticleComponent,
  SectionAsideComponent,
  SectionDivComponent,
  SectionFooterComponent,
  SectionHeaderComponent,
  SectionMainComponent,
  SectionNavComponent,
  SectionSectionComponent
} from "./widgets/styled-components/SectionComponents(deprecated)";

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
    if (background_image.url /*  && !isScrollEffect */) {
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

    let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
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

    let component = SectionDivComponent;

    switch (layout_html_tag) {
      case "aside":
        {
          component = SectionAsideComponent;
        }
        break;
      case "nav":
        {
          component = SectionNavComponent;
        }
        break;
      case "section":
        {
          component = SectionSectionComponent;
        }
        break;
      case "article":
        {
          component = SectionArticleComponent;
        }
        break;
      case "main":
        {
          component = SectionMainComponent;
        }
        break;
      case "footer":
        {
          component = SectionFooterComponent;
        }
        break;
      case "header":
        {
          component = SectionHeaderComponent;
        }
        break;
    }
    console.log("====================================");
    console.log(component);
    console.log("====================================");
    return React.createElement(
      component,
      {
        style: styles,
        className:
          sectionClasses.join(" ") +
          " " +
          this.state.settings.position_style_css_classes,
        id: "",
        onClick: this.onClick,
        settings: this.props.element.getSettings()
      },
      sectionWrapper
    );
  }
}

function mapStateToProps(state) {
  return {
    changeWidthColumns: state.columnWidth
  };
}

export default SectionWidgetComponent;
