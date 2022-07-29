import BaseElement from "./BaseElement";
import Column from "./Column";
import {
  CONTROLLER_TEXT,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_COLOR,
  CONTROLLER_SWITCHER,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  TAB_CONTENT,
  CONTROLLER_SHADOW,
  CONTROLLER_LINK,
  CONTROLLER_COLWIDTH,
  TAB_STYLE,
  CONTROLLER_GRADIENT,
  CONTROLLER_MEDIA
} from "../modules/ControllersManager";
import RowIcon from "../../../svgs/section.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";

class SectionWidget extends BaseElement {
  static getName() {
    return "section_widget";
  }
  static getTitle() {
    return "Section";
  }

  static getIconComponent() {
    return RowIcon;
  }

  static getType() {
    return "widget";
  }
  static getGroup() {
    return "Basic";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }
    this.startControlSection("Layout", {
      label: "Layout"
    });

    this.addControl("layout_content_width_type", {
      type: CONTROLLER_SELECT,
      label: "Content width",
      default: "boxed",
      options: [
        {
          value: "boxed",
          label: "boxed"
        },
        {
          value: "full",
          label: "full width"
        },
        {
          value: "section_boxed",
          label: "section-boxed"
        }
        // {
        //   value: 'full-fill',
        //   label: 'full fill'
        // }
      ],
      prefixClass: "altrp-section_",
    });

    this.addControl("layout_flex_wrap_content", {
      type: CONTROLLER_SELECT,
      label: "Column wrap",
      options: [
        {
          value: "nowrap",
          label: "nowrap"
        },
        {
          value: "wrap",
          label: "wrap"
        },
        {
          value: "wrap-reverse",
          label: "wrap reverse"
        }
      ],
    });

    this.addControl("layout_column_position", {
      type: CONTROLLER_SELECT,
      label: "Vertical Alignment",
      options: [
        {
          value: "stretch",
          label: "Stretch"
        },
        {
          value: "baseline",
          label: "Baseline"
        },
        {
          value: "center",
          label: "Center"
        },
        {
          value: "flex-start",
          label: "Flex Start"
        },
        {
          value: "flex-end",
          label: "Flex End"
        },
        {
          value: "space-around",
          label: "Space Around"
        },
        {
          value: "space-between",
          label: "Space Between"
        },
        {
          value: "space-evenly",
          label: "Space Evenly"
        },
        {
          value: "unset",
          label: "Unset"
        }
      ],
    });

    this.addControl("layout_justify_content", {
      type: CONTROLLER_SELECT,
      label: "Horizontal Alignment",
      options: [
        {
          value: "baseline",
          label: "baseline"
        },
        {
          value: "center",
          label: "center"
        },
        {
          value: "flex-start",
          label: "flex-start"
        },
        {
          value: "flex-end",
          label: "flex-end"
        },
        {
          value: "space-around",
          label: "space-around"
        },
        {
          value: "space-between",
          label: "space-between"
        },
        {
          value: "space-evenly",
          label: "space-evenly"
        },
        {
          value: "unset",
          label: "unset"
        }
      ],
    });

    this.addControl("layout_column_direction", {
      type: CONTROLLER_SELECT,
      label: "Direction",
      options: [
        {
          value: "row",
          label: "row"
        },
        {
          value: "row-reverse",
          label: "row reverse"
        },
        {
          value: "column",
          label: "column"
        },
        {
          value: "column-reverse",
          label: "column-reverse"
        },
        {
          value: "unset",
          label: "unset"
        }
      ],
    });

    this.addControl("layout_content_width", {
      type: CONTROLLER_SLIDER,
      label: "Width",
      default: {
        unit: "px"
      },
      units: ["px", "%", "vw", "vh"],
      max: 2000,
      min: 0,
    });

    this.addControl("layout_columns_gap", {
      type: CONTROLLER_SELECT,
      label: "Columns gap",
      default: "none",
      options: [
        {
          value: "",
          label: "none"
        },
        {
          value: "0",
          label: "No gap"
        },
        {
          value: "5",
          label: "Narrow"
        },
        {
          value: "15",
          label: "Extended"
        },
        {
          value: "20",
          label: "Wide"
        },
        {
          value: "30",
          label: "Winder"
        }
      ],
    });

    this.addControl("layout_height", {
      type: CONTROLLER_SELECT,
      label: "Height",
      default: "default",
      options: [
        {
          value: "default",
          label: "default"
        },
        {
          value: "fit",
          label: "fit to screen"
        },
        {
          value: "min_height",
          label: "min height"
        }
      ],
      locked: true,
    });

    this.addControl("label_style_min_height", {
      type: CONTROLLER_SLIDER,
      label: "Minimum height",
      default: {
        unit: "px"
      },
      units: ["px", "%", "vh", "vw"],
      max: 1440,
      min: 0,
    });

    this.addControl("layout_overflow", {
      type: CONTROLLER_SELECT,
      label: "overflow",
      options: [
        {
          value: "visible",
          label: "default"
        },
        {
          value: "hidden",
          label: "hidden"
        }
      ],
    });

    this.addControl("layout_html_tag", {
      type: CONTROLLER_SELECT,
      label: "HTML tag",
      default: "div",
      options: [
        {
          value: "div",
          label: "default"
        },
        {
          value: "header",
          label: "header"
        },
        {
          value: "footer",
          label: "footer"
        },
        {
          value: "main",
          label: "main"
        },
        {
          value: "article",
          label: "article"
        },
        {
          value: "section",
          label: "section"
        },
        {
          value: "aside",
          label: "aside"
        },
        {
          value: "nav",
          label: "nav"
        }
      ],
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("section_link", {
      tab: TAB_CONTENT,
      label: "Section Link"
    });

    this.addControl("link_link", {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: "Link",
      locked: true,
    });

    this.endControlSection();

    /**
     * Разработка структуры ширины
     */

    this.startControlSection("Structure", {
      tab: TAB_CONTENT,
      label: "Structure"
    });

    this.addControl("layout_colwidth", {
      type: CONTROLLER_COLWIDTH,
      label: "Column width",
      prefixClass: "column-structure_"
    });

    this.endControlSection();

    this.startControlSection("section_style_background", {
      tab: TAB_STYLE,
      label: "Background"
    });

    this.addControl("section_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("gradient", {
      type: CONTROLLER_GRADIENT,
      label: "Gradient",
      hideOnClick: true,
      default: {
        isWithGradient: false,
        firstColor: "rgba(97,206,112,1)",
        firstPoint: "100",
        secondColor: "rgba(242,41,91,1)",
        secondPoint: "0",
        angle: "0",
        value: ""
      },
    });

    this.addControl("background_image", {
      type: CONTROLLER_MEDIA,
      label: "Background Image",
      default: { url: "" },
      locked: true,
    });

    this.addControl("background_position", {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "top left",
          label: "top left"
        },
        {
          value: "top",
          label: "top"
        },
        {
          value: "top right",
          label: "top right"
        },
        {
          value: "right",
          label: "right"
        },
        {
          value: "bottom right",
          label: "bottom right"
        },
        {
          value: "bottom",
          label: "bottom"
        },
        {
          value: "bottom left",
          label: "bottom left"
        },
        {
          value: "left",
          label: "left"
        },
        {
          value: "center",
          label: "center"
        }
      ],
      label: "Background Position",
    });

    this.addControl("background_attachment", {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "scroll",
          label: "scroll"
        },
        {
          value: "fixed",
          label: "fixed"
        },
        {
          value: "local",
          label: "local"
        }
      ],
      label: "Background Attachment",
    });

    this.addControl("background_repeat", {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "repeat",
          label: "repeat"
        },
        {
          value: "repeat-x",
          label: "repeat-x"
        },
        {
          value: "repeat-y",
          label: "repeat-y"
        },
        {
          value: "space",
          label: "space"
        },
        {
          value: "round",
          label: "round"
        },
        {
          value: "no-repeat",
          label: "no-repeat"
        }
      ],
      label: "Background Repeat",
    });

    this.addControl("background_image_width", {
      type: CONTROLLER_SLIDER,
      label: "Width",
      default: {
        unit: "px"
      },
      conditions: {
        background_size: [""]
      },
      units: ["px", "%", "vw"],
      max: 1000,
      min: 0,
    });

    this.addControl("background_size", {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "unset",
          label: "unset"
        },
        {
          value: "cover",
          label: "cover"
        },
        {
          value: "contain",
          label: "contain"
        },
        {
          value: "",
          label: "set width"
        }
      ],
      label: "Background Size",
    });

    this.addControl("isScrollEffect", {
      type: CONTROLLER_SWITCHER,
      label: "Scroll Effects"
    });

    this.endControlSection();

    this.startControlSection("section_style_border", {
      tab: TAB_STYLE,
      label: "Border"
    });

    this.addControl("section_style_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border type",
      options: [
        {
          value: "none",
          label: "None"
        },
        {
          value: "solid",
          label: "Solid"
        },
        {
          value: "double",
          label: "Double"
        },
        {
          value: "dotted",
          label: "Dotted"
        },
        {
          value: "dashed",
          label: "Dashed"
        },
        {
          value: "groove",
          label: "Groove"
        }
      ],
    });

    this.addControl("section_style_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("section_style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("section_style_border_radius", {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      units:[
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl("section_style_box_shadow", {
      type: CONTROLLER_SHADOW,
      label: "Shadow",
    });

    this.endControlSection();

    this.startControlSection("position_style", {
      tab: TAB_STYLE,
      label: "Position"
    });

    this.addControl("position_style_position_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        unit: "px"
      },
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("position_style_position_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      // default: {
      //   top: 0,
      //   right: 0,
      //   bottom: 0,
      //   left: 0,
      //   unit: "px"
      // },
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("position_style_z_index", {
      type: CONTROLLER_NUMBER,
      label: "Z-index",
    });

    this.addControl("position_style_css_id", {
      type: CONTROLLER_TEXT,
      label: "CSS ID",
      locked: true,
    });

    this.addControl("position_style_css_classes", {
      type: CONTROLLER_TEXT,
      label: "CSS Classes",
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("position_fixed", {
      tab: TAB_STYLE,
      label: "Fixed Positioning"
    });

    // this.addControl('isFixed', {
    //   type: CONTROLLER_SWITCHER,
    //   label: 'Enable Fixed',
    // });

    this.addControl("position_top", {
      type: CONTROLLER_TEXT,
      label: "Top",
      conditions: {
        isFixed: [true]
      },
    });

    this.addControl("position_right", {
      type: CONTROLLER_TEXT,
      label: "Right",
      conditions: {
        isFixed: [true]
      },
    });

    this.addControl("position_left", {
      type: CONTROLLER_TEXT,
      label: "Left",
      conditions: {
        isFixed: [true]
      },
    });

    this.addControl("position_bottom", {
      type: CONTROLLER_TEXT,
      label: "Bottom",
      conditions: {
        isFixed: [true]
      },
    });



    this.endControlSection();

    advancedTabControllers(this);
  }

  /**
   * Добавлйет новую колонку в конец
   */
  appendColumn(newColumn) {
    if (!newColumn instanceof Column) {
      throw "Only Column can be a Child of Section";
    }
    this.appendChild(newColumn, false);
  }

  /**
   * Возвращает количество колонок в секции
   * @return {int}
   */
  getColumnsCount() {
    return this.children.length;
  }
}

export default SectionWidget;
