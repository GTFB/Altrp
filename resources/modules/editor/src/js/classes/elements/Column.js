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
  CONTROLLER_MEDIA
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Column  extends BaseElement {

  static getName(){
    return 'column';
  }
  static getTitle(){
    return 'Column';
  }
  static getType(){
    return 'column';
  }
  _registerControls(){

    this.startControlSection('layout',{
      label: 'Layout'
      });

    this.addControl('layout_column_width', {
      type: CONTROLLER_NUMBER,
      label: 'Column width (%)',
      default: null,
      rules: {
        '{{ELEMENT}}.altrp-element.altrp-element_column': 'width: {{VALUE}}%',
      }
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
      rules: {
        "{{ELEMENT}} > .altrp-column{{STATE}}": "flex-wrap: {{VALUE}}",
      },
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
      rules: {
        "{{ELEMENT}} > .altrp-column{{STATE}}": "flex-direction: {{VALUE}}"
      },
    }
    );

    this.addControl(
      'layout_type', {
        type: CONTROLLER_SELECT,
        label: 'Vertical align',
        options:[
          {
            'value' : 'normal',
            'label' : 'default',
          },
          {
            'value' : 'flex-start',
            'label' : 'top'
          },
          {
            'value' : 'center',
            'label' : 'center'
          },
          {
            'value' : 'flex-end',
            'label' : 'bottom'
          },
          {
            'value' : 'space-between',
            'label' : 'space between'
          },
          {
            'value' : 'space-around',
            'label' : 'space around'
          },
          {
            'value' : 'space-evenly',
            'label' : 'space evenly'
          }
        ],
        rules: {
          '{{ELEMENT}} > .altrp-column{{STATE}}': ['align-content: {{VALUE}};',
            'align-items: {{VALUE}};'
          ],
        },
      }
    );

    this.addControl(
      'layout_justify_content', {
        type: CONTROLLER_SELECT,
        label: 'Horizontal align',
        options:[
          {
            'value' : '',
            'label' : 'default',
          },
          {
            'value' : 'flex-start',
            'label' : 'start'
          },
          {
            'value' : 'center',
            'label' : 'center'
          },
          {
            'value' : 'flex-end',
            'label' : 'end'
          },
          {
            'value' : 'space-between',
            'label' : 'space between'
          },
          {
            'value' : 'space-around',
            'label' : 'space around'
          },
          {
            'value' : 'space-evenly',
            'label' : 'space evenly'
          }
        ],
        rules: {
          '{{ELEMENT}} > .altrp-column{{STATE}}': 'justify-content: {{VALUE}} !important;',
        },
      }
    );

    this.addControl('layout_widgets-space', {
      type: CONTROLLER_NUMBER,
      label: 'Widgets space (px)',
      default: 0,
      rules: {
        '{{ELEMENT}} .altrp-element:not(:last-child){{STATE}}': 'margin-bottom: {{VALUE}}px',
      }
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
      rules: {
        '{{ELEMENT}} > .altrp-column{{STATE}}': 'overflow: {{VALUE}}',
      },
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
      rules: {
        "{{ELEMENT}} > .altrp-column{{STATE}}": "background-color: {{COLOR}};"
      }
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
      rules: {
        "{{ELEMENT}} > .altrp-column{{STATE}}": "background-image: {{VALUE}}"
      }
    });

    this.addControl('background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
      default: { url: "" },
      rules: {
        "{{ELEMENT}} > .altrp-column.altrp-background-image{{STATE}}": "background-image: url({{URL}});"
      }
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
      default: 'top left',
      rules: {
        "{{ELEMENT}} > .altrp-column.altrp-background-image{{STATE}}": "background-position: {{VALUE}};"
      }
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
      default: 'scroll',
      rules: {
        "{{ELEMENT}} > .altrp-column.altrp-background-image{{STATE}}": "background-attachment: {{VALUE}};"
      }
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
      default: 'repeat',
      rules: {
        "{{ELEMENT}} > .altrp-column.altrp-background-image{{STATE}}": "background-repeat: {{VALUE}};"
      }
    });

    this.addControl("background_image_width", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        size: 100,
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
      rules: {
        "{{ELEMENT}} > .altrp-column.altrp-background-image{{STATE}}": "background-size: {{SIZE}}{{UNIT}};"
      }
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
      default: 'unset',
      rules: {
        "{{ELEMENT}} > .altrp-column.altrp-background-image{{STATE}}": "background-size: {{VALUE}};"
      }
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
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}}.altrp-element_column.altrp-element > .altrp-column{{STATE}}": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl('style_position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default:{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}}.altrp-element_column.altrp-element > .altrp-column{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('position_z_index', {
      type: CONTROLLER_NUMBER,
      label: "Z-index",
      default: 0,
      rules: {
        "{{ELEMENT}} > .altrp-column{{STATE}}": "z-index: {{VALUE}}"
      }
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
      rules: {
        "{{ELEMENT}} > .altrp-column{{STATE}}": "border-style: {{VALUE}};"
      }
    });

    this.addControl("column_style_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      default: {
        bind: true
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} > .altrp-column{{STATE}}":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("column_style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
      rules: {
        "{{ELEMENT}} > .altrp-column{{STATE}}": "border-color: {{COLOR}};"
      }
    });

    this.addControl("column_style_border_radius", {
      type: CONTROLLER_SLIDER,
      label: 'Border radius',
      default:{
        size: 0,
        unit: 'px',
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} > .altrp-column{{STATE}}": "border-radius: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl('column_style_box_shadow', {
        type: CONTROLLER_SHADOW,
        label: 'Shadow',
        default:{
          blur: 0,
          horizontal: 0,
          vertical: 0,
          spread: 0,
          opacity: 1,
          colorRGB: 'rgb(0, 0, 0)',
          color: 'rgb(0, 0, 0)',
          colorPickedHex: '#000000',
          type: ""
        },
        rules: {
          '{{ELEMENT}} > .altrp-column{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
        },
      }
    );

    this.endControlSection();

    advancedTabControllers(this);
  }

  appendWidget(newWidget) {
    if(newWidget.getType() !== 'widget'){
      throw 'Only Widget can be a Child of Column';
    }
    this.appendChild(newWidget, false);
  }

  /**
   * Вставляет новую колонку после текущей колонки
   */
  insertNewColumnAfter(){
    let column = new Column();
    this.insertSiblingAfter(column);
  }

  /**
   * Проверяет можно ли удалить текущую колонку (в секции обязательна одна колонка)
   * @return {boolean}
   */
  canDeleteThis(){
    return this.parent.children.length > 1
  }


}

export default Column
