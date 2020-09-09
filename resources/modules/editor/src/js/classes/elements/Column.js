import BaseElement from "./BaseElement";
import {
  CONTROLLER_TEXT,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_LINK,
  CONTROLLER_COLOR,
  CONTROLLER_SELECT,
  CONTROLLER_SHADOW,
  CONTROLLER_CSSEDITOR,
  CONTROLLER_SLIDER,
  TAB_STYLE,
  TAB_ADVANCED,
  TAB_CONTENT,
  CONTROLLER_GRADIENT
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
        '{{ELEMENT}}.altrp-element_column{{STATE}}': 'width: {{VALUE}}%',
      }
    });

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
          '{{ELEMENT}} .altrp-column{{STATE}}': 'align-content: {{VALUE}};',
          '{{ELEMENT}} .altrp-column': 'align-items: {{VALUE}};',
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
          '{{ELEMENT}} .altrp-column{{STATE}}': 'justify-content: {{VALUE}} !important;',
        },
      }
    );

    this.addControl('layout_widgets-space', {
      type: CONTROLLER_NUMBER,
      label: 'Widgets space (px)',
      default: 0,
      rules: {
        '{{ELEMENT}} .altrp-element{{STATE}}': 'margin-bottom: {{VALUE}}px',
        '{{ELEMENT}} .altrp-element:last-child{{STATE}}': 'margin-bottom: 0px'
      }
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
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-column{{STATE}}": "background-color: {{COLOR}};"
      }
    });

    this.addControl('gradient', {
      type: CONTROLLER_GRADIENT,
      label: 'Gradient',
      default: {
        isWithGradient: false,
        firstColor: "rgba(97,206,112,1)",
        firstPoint: '0',
        secondColor: "rgba(242,41,91,1)",
        secondPoint: "100",
        angle: "0"
      },
      rules: {
        "{{ELEMENT}} > .altrp-gradient{{STATE}}": "background-image: linear-gradient({{ANGLE}}deg, {{FIRSTCOLOR}} {{FIRSTPOINT}}%, {{SECONDCOLOR}} {{SECONDPOINT}}%);"
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
        "{{ELEMENT}} .altrp-column{{STATE}}": [
          "padding-top: {{TOP}}{{UNIT}} !important;",
          "padding-right: {{RIGHT}}{{UNIT}} !important;",
          "padding-bottom: {{BOTTOM}}{{UNIT}} !important;",
          "padding-left: {{LEFT}}{{UNIT}} !important;"
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
        '{{ELEMENT}} .altrp-column{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}} !important;',
          'margin-right: {{RIGHT}}{{UNIT}} !important;',
          'margin-bottom: {{BOTTOM}}{{UNIT}} !important;',
          'margin-left: {{LEFT}}{{UNIT}} !important;'
        ]
      },
    });

    this.addControl('position_z_index', {
      type: CONTROLLER_NUMBER,
      label: "Z-index",
      default: 0,
      rules: {
        "{{ELEMENT}} .altrp-column{{STATE}}": "z-index: {{VALUE}}"
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
        "{{ELEMENT}} .altrp-column{{STATE}}": "border-style: {{VALUE}};"
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
        "{{ELEMENT}} .altrp-column{{STATE}}":
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
        "{{ELEMENT}} .altrp-column{{STATE}}": "border-color: {{COLOR}};"
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
        "{{ELEMENT}} .altrp-column{{STATE}}": "border-radius: {{SIZE}}{{UNIT}}"
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
        presetColors: [
          '#eaeaea',
          '#9c18a8'
        ],
        rules: {
          '{{ELEMENT}} .altrp-column{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
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
    this.appendChild(newWidget);
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
