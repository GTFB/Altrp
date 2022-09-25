import BaseElement from "./BaseElement";
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_LINK,
  CONTROLLER_COLOR,
  CONTROLLER_SELECT,
  CONTROLLER_SHADOW,
  CONTROLLER_SLIDER,
  TAB_STYLE,
  TAB_CONTENT,
  CONTROLLER_GRADIENT,
  CONTROLLER_MEDIA, CONTROLLER_TEXT, CONTROLLER_SWITCHER, CONTROLLER_TEXTAREA
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Column extends BaseElement {

  static getName() {
    return 'column';
  }
  static getTitle() {
    return 'Column';
  }
  static getType() {
    return 'column';
  }
  _registerControls() {

    this.startControlSection('layout', {
      label: 'Layout'
    });

    this.addControl('layout_column_width', {
      // type: CONTROLLER_NUMBER,
      label: 'Column width (%)',
      dynamic: false,
      default: null,
    });

    this.addControl(
      'layout_flex_wrap_content', {
      type: CONTROLLER_SELECT,
      label: 'Column wrap',
      options: [
        {
          'value': 'wrap',
          'label': 'wrap'
        },
        {
          'value': 'nowrap',
          'label': 'nowrap'
        },
        {
          'value': 'wrap-reverse',
          'label': 'wrap reverse'
        }
      ],
    }
    );
    this.addControl('layout_column_direction', {
      type: CONTROLLER_SELECT,
      label: 'Direction',
      options: [
        {
          'value': 'row',
          'label': 'row'
        },
        {
          'value': 'row-reverse',
          'label': 'row reverse'
        },
        {
          'value': 'column',
          'label': 'column'
        },
        {
          'value': 'column-reverse',
          'label': 'column-reverse'
        },
        {
          'value': 'unset',
          'label': 'unset'
        },
      ],
    }
    );

    this.addControl(
      'layout_type', {
      type: CONTROLLER_SELECT,
      label: 'Vertical align',
      options: [
        {
          'value': 'normal',
          'label': 'default',
        },
        {
          'value': 'flex-start',
          'label': 'top'
        },
        {
          'value': 'center',
          'label': 'center'
        },
        {
          'value': 'flex-end',
          'label': 'bottom'
        },
        {
          'value': 'space-between',
          'label': 'space between'
        },
        {
          'value': 'space-around',
          'label': 'space around'
        },
        {
          'value': 'space-evenly',
          'label': 'space evenly'
        }
      ],
    }
    );

    this.addControl(
      'layout_justify_content', {
      type: CONTROLLER_SELECT,
      label: 'Horizontal align',
      options: [
        {
          'value': '',
          'label': 'default',
        },
        {
          'value': 'flex-start',
          'label': 'start'
        },
        {
          'value': 'center',
          'label': 'center'
        },
        {
          'value': 'flex-end',
          'label': 'end'
        },
        {
          'value': 'space-between',
          'label': 'space between'
        },
        {
          'value': 'space-around',
          'label': 'space around'
        },
        {
          'value': 'space-evenly',
          'label': 'space evenly'
        }
      ],
    }
    );

    this.addControl('layout_widgets-space', {
      type: CONTROLLER_NUMBER,
      label: 'Widgets space (px)',
    });

    this.addControl('layout_overflow', {
      type: CONTROLLER_SELECT,
      label: 'Overflow',
      options: [
        {
          value: 'auto',
          label: 'auto'
        },
        {
          value: 'hidden',
          label: 'hidden'
        },
        {
          value: 'scroll',
          label: 'scroll'
        },
        {
          value: 'visible',
          label: 'visible'
        },
        {
          value: 'inherit',
          label: 'default'
        }
      ],
    });

    this.addControl('layout_html_tag', {
      type: CONTROLLER_SELECT,
      label: 'HTML tag',
      default: 'div',
      options: [
        {
          value: 'div',
          label: 'default'
        },
        {
          value: 'header',
          label: 'header'
        },
        {
          value: 'footer',
          label: 'footer'
        },
        {
          value: 'main',
          label: 'main'
        },
        {
          value: 'article',
          label: 'article'
        },
        {
          value: 'section',
          label: 'section'
        },
        {
          value: 'aside',
          label: 'aside'
        },
        {
          value: 'nav',
          label: 'nav'
        }
      ]
    });

    this.endControlSection();

    this.startControlSection("column_link", {
      tab: TAB_CONTENT,
      label: "Column Link"
    });

    this.addControl('link_link', {
      type: CONTROLLER_LINK,
      responsive:false,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: 'Link',
    });

    this.endControlSection();

    this.startControlSection("column_style_background", {
      tab: TAB_STYLE,
      label: "Background"
    });

    this.addControl("column_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl('gradient', {
      type: CONTROLLER_GRADIENT,
      hideOnClick: true,
      label: 'Gradient',
      default: {
        isWithGradient: false,
        firstColor: "rgba(97,206,112,1)",
        firstPoint: '100',
        secondColor: "rgba(242,41,91,1)",
        secondPoint: "0",
        angle: "0",
        value: ""
      },
    });

    this.addControl('background_image', {
      type: CONTROLLER_MEDIA,
      locked: true,
      label: 'Background Image',
      default: { url: "" },
    });

    this.addControl('background_position', {
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
      label: 'Background Position',
    });

    this.addControl('background_attachment', {
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
      label: 'Background Attachment',
    });

    this.addControl('background_repeat', {
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
      label: 'Background Repeat',
    });

    this.addControl("background_image_width", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        unit: 'px',
      },
      conditions: {
        'background_size': [''],
      },
      units: [
        'px',
        '%',
        'vw',
      ],
      max: 1000,
      min: 0,
    });

    this.addControl('background_size', {
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
        },
      ],
      label: 'Background Size',
    });

    this.endControlSection();

    this.startControlSection("style_position", {
      tab: TAB_STYLE,
      label: "Position"
    });

    this.addControl("style_position_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        unit: "px"
      },
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl('style_position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default: {
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
    });

    this.addControl('position_z_index', {
      type: CONTROLLER_NUMBER,
      label: "Z-index",
    });

    this.addControl("position_style_css_id_column", {
      type: CONTROLLER_TEXT,
      label: "CSS ID"
    });

    this.addControl("position_style_css_classes_column", {
      type: CONTROLLER_TEXT,
      label: "CSS Classes"
    });

    this.endControlSection();

    this.startControlSection("column_style_border", {
      tab: TAB_STYLE,
      label: "Border"
    });

    this.addControl("column_style_border_type", {
      type: CONTROLLER_SELECT,
      label: "border Type",
      units: ["px", "%", "vh"],
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

    this.addControl("column_style_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      default: {
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    this.addControl("column_style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("column_style_border_radius", {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      units:[
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl('column_style_box_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
    }
    );

    this.addControl('column_style_border_gradient_custom', {
      type: CONTROLLER_SWITCHER,
      label: "Border Gradient",
    });

    this.addControl("column_style_gradient_text", {
      type: CONTROLLER_TEXTAREA,
      label: "linear-gradient",
      default: '',
      description: "Example:<br>linear-gradient(90deg,#0068e1,#a161ee) <a style='margin-top: 10px; color: #007bff; display: block' href='https://www.colorzilla.com/gradient-editor/' target='_blank'>--> CSS Gradient Generator</a>"
    });

    this.endControlSection();

    advancedTabControllers(this);
  }

  appendWidget(newWidget) {
    if (newWidget.getType() !== 'widget') {
      throw 'Only Widget can be a Child of Column';
    }
    this.appendChild(newWidget, false);
  }

  /**
   * Вставляет новую колонку после текущей колонки
   */
  insertNewColumnAfter() {
    let column = new Column();
    this.insertSiblingAfter(column);
  }

  /**
   * Проверяет можно ли удалить текущую колонку (в секции обязательна одна колонка)
   * @return {boolean}
   */
  canDeleteThis() {
    return this.parent.children.length > 1
  }


}

export default Column
