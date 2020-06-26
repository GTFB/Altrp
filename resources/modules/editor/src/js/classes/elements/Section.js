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
  TAB_STYLE
} from "../modules/ControllersManager";

class Section extends BaseElement{

  static getName(){
    return 'section';
  }
  static getTitle(){
    return 'Section';
  }
  static getType(){
    return 'section';
  }
  _registerControls(){

    this.startControlSection('Layout',{
      label: 'Layout'
    });

    this.addControl('layout_stretch_section', {
      type: CONTROLLER_SWITCHER,
      label: 'Stretch section',
    });

    this.addControl('layout_content_width', {
      type: CONTROLLER_SELECT,
      label: 'Content width',
      default: 'Boxed',
      options: [
        {
          value: 'boxed',
          label: 'Boxed'
        },
        {
          value: 'full',
          label: 'full width'
        }
      ]
    });

    this.addControl("label_style_spacing", {
      type: CONTROLLER_SLIDER,
      label: "width",
      default: {
        size: 100,
        unit: "%"
      },
      units: ["px", "%", "vh"],
      max: 500,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-column": "width: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl('layout_columns_gap', {
      type: CONTROLLER_SELECT,
      label: 'Columns gap',
      default: 'none',
      options: [
        {
          value: 'none',
          label: 'none'
        },
        {
          value: 'no',
          label: 'No gap'
        },
        {
          value: 'narrow',
          label: 'Narrow'
        },
        {
          value: 'extended',
          label: 'Extended'
        },
        {
          value: 'wide',
          label: 'Wide'
        },
        {
          value: 'winder',
          label: 'Winder'
        }
      ]
    });

    this.addControl('layout_height', {
      type: CONTROLLER_SELECT,
      label: 'Height',
      default: 'default',
      options: [
        {
          value: 'default',
          label: 'default'
        },
        {
          value: 'fit_to_screen',
          label: 'fit to screen'
        },
        {
          value: 'min_height',
          label: 'min height'
        }
      ]
    });

    this.addControl("label_style_min_height", {
      type: CONTROLLER_SLIDER,
      label: "Minimum height",
      default: {
        size: 0,
        unit: "px"
      },
      units: ["px", "vh"],
      max: 1440,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-section": "min-height: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl('layout_column_position', {
      type: CONTROLLER_SELECT,
      label: 'Column Posiion',
      default: 'stretch',
      options: [
        {
          value: 'stretch',
          label: 'Stretch'
        },
        {
          value: 'top',
          label: 'Top'
        },
        {
          value: 'middle',
          label: 'Middle'
        },
        {
          value: 'bottom',
          label: 'Bottom'
        }
      ]
    });

    this.addControl('layout_ver_align', {
        type: CONTROLLER_SELECT,
        label: 'Vertical align',
        options:[
          {
            'value' : '',
            'label' : 'default',
          },
          {
            'value' : 'flex-start',
            'label' : 'top'
          },
          {
            'value' : 'center',
            'label' : 'middle'
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
          '{{ELEMENT}} .altrp-section': 'align-content: {{VALUE}};',
          '{{ELEMENT}} .altrp-section': 'align-items: {{VALUE}};',
        },
      }
    );

    this.addControl('layout_overflow', {
      type: CONTROLLER_SELECT,
      label: 'overflow',
      default: 'visible',
      options: [
        {
          value: 'visible',
          label: 'default'
        },
        {
          value: 'hidden',
          label: 'hidden'
        }
      ],
      rules: {
        '{{ELEMENT}} .altrp-section': 'overflow: {{VALUE}};',
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

    this.startControlSection("secion_link", {
      tab: TAB_CONTENT,
      label: "Section Link"
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

    this.startControlSection("section_style_background", {
      tab: TAB_STYLE,
      label: "Background"
    });

    this.addControl("section_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-section": "background-color: {{COLOR}};"
      }
    });

    this.endControlSection();

    this.startControlSection("section_style_border", {
      tab: TAB_STYLE,
      label: "Border"
    });

    this.addControl("section_style_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border type",
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
        "{{ELEMENT}} .altrp-section": "border-style: {{VALUE}};"
      }
    });

    this.addControl("section_style_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-section":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("section_style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
      rules: {
        "{{ELEMENT}} .altrp-section": "border-color: {{COLOR}};"
      }
    });

    this.addControl("section_style_border_radius", {
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
        "{{ELEMENT}} .altrp-section": "border-radius: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl('section_style_box_shadow', {
        type: CONTROLLER_SHADOW,
        label: 'Shadow',
        default:{
          blur: 0,
          horizontal: 0,
          vertical: 0,
          opacity: 1,
          colorRGB: 'rgb(0, 0, 0)',
          color: 'rgb(0, 0, 0)',
          colorPickedHex: '#000000',
        },
        presetColors: [
          '#eaeaea',
          '#9c18a8'
        ],
        rules: {
          '{{ELEMENT}} .altrp-section': 'box-shadow: {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{COLOR}};',
        },
      }
    );

    this.endControlSection();

    this.startControlSection("position_style", {
      tab: TAB_STYLE,
      label: "Position"
    });

    this.addControl("position_style_position_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        top: 15,
        right: 15,
        bottom: 15,
        left: 15,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-section": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl('position_style_position_margin', {
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
        '{{ELEMENT}} .altrp-section': [ 
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('position_style_z_index', {
      type: CONTROLLER_NUMBER,
      label: "Z-index",
      default: 0,
      rules: {
        "{{ELEMENT}} .altrp-section": "z-index: {{VALUE}}"
      }
    });

    this.addControl("position_style_css_id", {
      type: CONTROLLER_TEXT,
      label: "CSS ID"
    });

    this.addControl("position_style_css_classes", {
      type: CONTROLLER_TEXT,
      label: "CSS Classes"
    });

    
  }

  /**
   * Добавлйет новую колонку в конец
   */
  appendColumn(newColumn) {
    if(!newColumn instanceof Column){
      throw 'Only Column can be a Child of Section';
    }
    this.appendChild(newColumn);
  }

  /**
   * Возвращает количество колонок в секции
   * @return {int}
   */
  getColumnsCount(){
    return this.children.length;
  }
}

export default Section