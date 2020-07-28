import BaseElement from "./BaseElement";
import WidgetIcon from "../../../svgs/widget_accordion.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_COLOR,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_SHADOW,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_NUMBER,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SLIDER,
  CONTROLLER_LINK,
  CONTROLLER_TRANSFORM,
  CONTROLLER_CHOOSE, CONTROLLER_REPEATER, CONTROLLER_WYSIWYG, CONTROLLER_MEDIA, CONTROLLER_SWITCHER,
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Accordion extends BaseElement {
  static getName() {
    return "accordion";
  }
  static getTitle() {
    return "Accordion";
  }
  static getIconComponent() {
    return WidgetIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("accordion_content", {
      tab: TAB_CONTENT,
      label: "Accordion",
    });

    let repeater = new Repeater();

    repeater.addControl('title_repeater', {
      type: CONTROLLER_TEXT,
      label: 'Title',
    });

    repeater.addControl("content_select_repeater", {
      type: CONTROLLER_SELECT,
      label: "Icon",
      options: [
        {
          value: "custom",
          label: "custom"
        },
        {
          value: "template",
          label: "template"
        },
      ],
    });

    repeater.addControl("wysiwyg_repeater", {
      type: CONTROLLER_TEXTAREA,
      label: "Text",
      default: "I Am Advanced Text"
    });

    this.addControl('repeater_accordion_content', {
      label: 'Accordion items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
      default: [
        {
          title_repeater: "Title #1",
          wysiwyg_repeater: "Content #1"
        },
        {
          title_repeater: "Title #2",
          wysiwyg_repeater: "Content #2"
        },
        {
          title_repeater: "Title #3",
          wysiwyg_repeater: "Content #3"
        }
      ]
    });

    this.addControl("title_html_tag_accordion_content", {
      type: CONTROLLER_SELECT,
      label: "Title HTML tag",
      default: "div",
      options: [
        {
          value: "h1",
          label: "h1"
        },
        {
          value: "h2",
          label: "h2"
        },
        {
          value: "h3",
          label: "h3"
        },
        {
          value: "h4",
          label: "h4"
        },
        {
          value: "h5",
          label: "h5"
        },
        {
          value: "h6",
          label: "h6"
        },
        {
          value: "span",
          label: "span"
        },
        {
          value: "div",
          label: "div"
        },
        {
          value: "p",
          label: "p"
        },

      ],
    });

    this.addControl('icon_accordion_content', {
      type: CONTROLLER_MEDIA,
      label: 'Icon',
    });

    this.addControl('active_icon_accordion_content', {
      type: CONTROLLER_MEDIA,
      label: 'Active icon',
    });

    this.endControlSection();

    this.startControlSection("additional_content", {
      tab: TAB_CONTENT,
      label: "Additional",
    });

    this.addControl('multiple_additional_content', {
      type: CONTROLLER_SWITCHER,
      default: false,
      label: 'Multiple open',
    });

    this.addControl("active_item_additional_content", {
      type: CONTROLLER_NUMBER,
      label: "Acitve item no",
    });

    this.endControlSection();

    this.startControlSection("item_style", {
      tab: TAB_STYLE,
      label: "Item",
    });

    this.addControl('alignment_item_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      default: 'left',
      options:[
        {
          icon: 'left',
          value: 'left',
        },
        {
          icon: 'center',
          value: 'center',
        },
        {
          icon: 'right',
          value: 'right',
        },
      ],
      rules: {
        '{{ELEMENT}} .altrp-accordion-item-label{{STATE}}': 'text-align: {{VALUE}};',
        '{{ELEMENT}} .altrp-accordion-item-content{{STATE}}': 'text-align: {{VALUE}}'
      },
    });

    this.addControl('spacing_item_style', {
      type: CONTROLLER_SLIDER,
      label: 'Item spacing',
      default:{
        size: 0,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-accordion-item{{STATE}}': 'margin-top: {{SIZE}}{{UNIT}}',
      },
    });

    this.endControlSection();

    this.startControlSection("title_style", {
      tab: TAB_STYLE,
      label: "Title",
    });

    this.addControl('background_color_title_style', {
        type: CONTROLLER_COLOR,
        label: 'Background color',
        default: {
          color: "",
          colorPickedHex: "",
        },
        rules: {
          '{{ELEMENT}} .altrp-accordion-item-button{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('color_title_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        default: {
          color: "",
          colorPickedHex: "",
        },
        rules: {
          '{{ELEMENT}} .altrp-accordion-item-label{{STATE}}': 'color: {{COLOR}};',
        },
      }
    );

    this.addControl('box_shadow_title_style', {
        type: CONTROLLER_SHADOW,
        label: 'Box shadow',
        default:{
          blur: 0,
          horizontal: 0,
          vertical: 0,
          opacity: 1,
          spread: 0,
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
          '{{ELEMENT}} .altrp-accordion-item-button{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
        },
      }
    );

    this.addControl('padding_title_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default:{
        unit:'px',
        bind: true
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-accordion-item-button{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('border_type_title_style', {
        type: CONTROLLER_SELECT,
        label: 'Border Type',
        options:[
          {
            'value' : 'none',
            'label' : 'None',
          },
          {
            'value' : 'solid',
            'label' : 'Solid',
          },
          {
            'value' : 'double',
            'label' : 'Double',
          },
          {
            'value' : 'dotted',
            'label' : 'Dotted',
          },
          {
            'value' : 'dashed',
            'label' : 'Dashed',
          },
          {
            'value' : 'groove',
            'label' : 'Groove',
          },
        ],
        rules: {
          '{{ELEMENT}} .altrp-accordion-item-button{{STATE}}': 'border-style: {{VALUE}};',
        },
      }
    );

    this.addControl(
      'border_width_title_style', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        default: {
          bind: true
        },
        units:[
          'px',
          '%',
          'vh',
        ],
        rules: {
          '{{ELEMENT}} .altrp-accordion-item-button{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );

    this.addControl('border_color_title_style', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
        default: {
          color: "rgb(50,168,82)",
          colorPickedHex: "#32a852",
        },
        rules: {
          '{{ELEMENT}} .altrp-accordion-item-button{{STATE}}': 'border-color: {{COLOR}};',
        },
      }
    );

    this.addControl('border_radius_title_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      default:{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
        '{{ELEMENT}} .altrp-accordion-item-button{{STATE}}': 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}',
      },
    });

    this.addControl('font_typographic_title_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1,
          spacing: 0,
          size: 16,
          weight: "normal",
          family: '"lato"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-accordion-item-label{{STATE}}': [
            'font-size: {{SIZE}}px;',
            'line-height: {{LINEHEIGHT}};',
            'letter-spacing: {{SPACING}}px',
            'font-weight: {{WEIGHT}}',
            'text-transform: {{TRANSFORM}}',
            'font-style: {{STYLE}}',
            'text-decoration: {{DECORATION}}'
          ],
        },
      }
    );

    this.endControlSection();

    this.startControlSection("icon_style", {
      tab: TAB_STYLE,
      label: "Icon",
    });

    this.addControl('alignment_icon_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      default: 'right',
      options:[
        {
          icon: 'left',
          value: 'row-reverse',
        },
        {
          icon: 'right',
          value: 'row',
        },
      ],
      rules: {
        '{{ELEMENT}} .altrp-accordion-item-button{{STATE}}': 'flex-direction: {{VALUE}};',
      },
    });

    this.addControl('color_icon_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        default: {
          color: "",
          colorPickedHex: "",
        },
        rules: {
          '{{ELEMENT}} .altrp-accordion-item-icon{{STATE}} path': 'fill: {{COLOR}};',
        },
      }
    );

    this.addControl('spacing_icon_style', {
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      default:{
        size: 0,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-accordion-item-label{{STATE}}': [
          'margin-left: {{SIZE}}{{UNIT}}',
          'margin-right: {{SIZE}}{{UNIT}}'
        ],
      },
    });

    this.endControlSection();

    this.startControlSection("content_style", {
      tab: TAB_STYLE,
      label: "Content",
    });

    this.addControl('background_color_content_style', {
        type: CONTROLLER_COLOR,
        label: 'Background color',
        default: {
          color: "",
          colorPickedHex: "",
        },
        rules: {
          '{{ELEMENT}} .altrp-accordion-item-content{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('color_content_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        default: {
          color: "",
          colorPickedHex: "",
        },
        rules: {
          '{{ELEMENT}} .altrp-accordion-item-content{{STATE}}': 'color: {{COLOR}};',
        },
      }
    );

    this.addControl('border_radius_content_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      default:{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
        '{{ELEMENT}} .altrp-accordion-item-content{{STATE}}': 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}',
      },
    });

    this.addControl('padding_content_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default:{
        unit:'px',
        bind: true
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-accordion-item-content-show{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('spacing_content_style', {
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      default:{
        size: 0,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-accordion-item-content-show{{STATE}}': 'margin-top: {{SIZE}}{{UNIT}}',
      },
    });

    this.addControl('typographic_content_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1,
          spacing: 0,
          size: 16,
          weight: "normal",
          family: '"lato"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-accordion-item-content-show{{STATE}}': [
            'font-size: {{SIZE}}px;',
            'line-height: {{LINEHEIGHT}};',
            'letter-spacing: {{SPACING}}px',
            'font-weight: {{WEIGHT}}',
            'text-transform: {{TRANSFORM}}',
            'font-style: {{STYLE}}',
            'text-decoration: {{DECORATION}}'
          ],
        },
      }
    );

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Accordion;
