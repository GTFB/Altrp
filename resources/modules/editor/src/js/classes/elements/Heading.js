import BaseElement from "./BaseElement";
import HeadingIcon from "../../../svgs/widget_heading.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_COLOR,
  CONTROLLER_SELECT,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_SHADOW,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_LINK,
  CONTROLLER_CHOOSE,
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Heading extends BaseElement {
  static getName() {
    return "heading";
  }
  static getTitle() {
    return "Heading";
  }
  static getIconComponent() {
    return HeadingIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }
    this.startControlSection("text_section", {
      tab: TAB_CONTENT,
      label: "Text Section",
    });

    this.addControl("text", {
      type: CONTROLLER_TEXTAREA,
      label: "Text",
      default: "I Am Advanced Heading",
    });

    this.endControlSection();

    this.startControlSection('heading_settings', {
      tab: TAB_CONTENT,
      label: 'Text Settings',
    });

    this.addControl('heading_settings_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'alignment',
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
        {
          icon: 'in_width',
          value: 'justify',
        }
      ],
      rules: {
            '{{ELEMENT}}': 'text-align: {{VALUE}};',
      },
    });

    this.addControl('heading_settings_html_tag', {
      type: CONTROLLER_SELECT,
      label: 'Html tag',
      default: 'h1',
      options: [
        {
          value: 'h1',
          label: 'default'
        },
        {
          value: 'h2',
          label: 'h2'
        },
        {
          value: 'h3',
          label: 'h3'
        },
        {
          value: 'h4',
          label: 'h4'
        },
        {
          value: 'h5',
          label: 'h5'
        },
        {
          value: 'h6',
          label: 'h6'
        }
      ]
    });

    this.addControl('text_link', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: 'link',
    });

    this.endControlSection();

    this.startControlSection('heading_style_font', {
      tab: TAB_STYLE,
      label: 'Font',
    });
    
    this.addControl("heading_style_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-heading": "color: {{COLOR}};"
      }
    });
    
    this.addControl("heading_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-heading": "background-color: {{COLOR}};"
      }
    });

    this.addControl(
      'heading_style_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'typographic',
        default:{
          lineHeight: 0.1,
          spacing: 0,
          size: 36,
          weight: "normal",
          family: '"lato"',
          decoration: ""
        },
        familyOptions: [
              {
                value: '1',
                label:'Select sd  Content 1'
              },
              {
                value: '2',
                label:'Select Content 2'
              },
            ],
        weightOptions: [
          {
            value: '100',
            label:'100'
          },
          {
            value: '200',
            label:'200'
          },
          {
            value: '300',
            label:'300'
          },
          {
            value: '400',
            label:'400'
          },
          {
            value: '500',
            label:'500'
          },
          {
            value: '600',
            label:'600'
          },
          {
            value: '700',
            label:'700'
          },
          {
            value: '800',
            label:'800'
          },
          {
            value: '900',
            label:'900'
          },
          {
            value: 'bold',
            label:'bold'
          },
          {
            value: 'normal',
            label:'normal'
          },
          {
            value: 'bolder',
            label:'bolder'
          },
          {
            value: 'lighter',
            label:'lighter'
          },
        ],
        transformOptions: [
          {
            value: 'none',
            label:'default',
            key: 0
          },
          {
            value: 'capitalize',
            label:'capitalize',
            key: 1
          },
          {
            value: 'uppercase',
            label:'uppercase',
            key: 2
          },
          {
            value: 'lowercase',
            label:'lowercase',
            key: 3
          },
        ],
        styleOptions: [
          {
            value: 'normal',
            label:'normal',
            key: 0
          },
          {
            value: 'italic',
            label:'italic',
            key: 1
          },
          {
            value: 'oblique',
            label:'oblique',
            key: 2
          },
        ],
        decorationOptions: [
          {
            value: 'none',
            label:'none',
            key: 0
          },
          {
            value: 'underline',
            label:'underline',
            key: 1
          },
          {
            value: 'overline',
            label:'overline',
            key: 3
          },
          {
            value: 'line-through',
            label:'line-through',
            key: 4
          },
        ],
        rules: {
          '{{ELEMENT}} .altrp-heading': [
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

    this.addControl(
      'heading_style_text_shadow', {
        type: CONTROLLER_SHADOW,
        label: 'text shadow',
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
          '{{ELEMENT}} .altrp-heading': 'text-shadow: {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{COLOR}};',
        },
      }
    );
    
    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Heading;
