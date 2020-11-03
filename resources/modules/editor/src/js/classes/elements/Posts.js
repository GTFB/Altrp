import BaseElement from "./BaseElement";
import TableIcon from "../../../svgs/widget_post.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_SWITCHER,
  CONTROLLER_COLOR,
  TAB_ADVANCED,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_SLIDER,
  TAB_CONTENT,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_LINK,
  TAB_STYLE,
  CONTROLLER_CHOOSE,
  CONTROLLER_NUMBER,
  CONTROLLER_SHADOW,
  CONTROLLER_GRADIENT,
  CONTROLLER_MEDIA,
  CONTROLLER_WYSIWYG, CONTROLLER_QUERY, CONTROLLER_REPEATER, CONTROLLER_FILTERS, CONTROLLER_HEADING, CONTROLLER_SELECT2
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";
import Repeater from "../Repeater";

class Table extends BaseElement {
  static getName() {
    return "posts";
  }
  static getTitle() {
    return "Posts";
  }
  static getIconComponent() {
    return TableIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("posts_content_datasource", {
        tab: TAB_CONTENT,
        label: "Data Source"
    });

    this.addControl("choose_datasource", {
      type: CONTROLLER_SELECT,
      label: 'Choose Data Source',
      options:[
        {
          label: 'Query',
          value: 'query'
        },
        {
          label: 'From Page Data Source',
          value: 'datasource'
        },
      ],
      default: 'query',
    });

    this.addControl("posts_datasource", {
      label: 'Path',
      type: CONTROLLER_TEXTAREA,
      conditions: {
        'choose_datasource': 'datasource',
      },
    });

    this.addControl("posts_query_heading", {
      type: CONTROLLER_HEADING,
      label: 'Query',
      conditions: {
        'choose_datasource': 'query',
      },
    });

    this.addControl("posts_query", {
      type: CONTROLLER_QUERY,
      conditions: {
        'choose_datasource': 'query',
      },
    });

    this.endControlSection();

    this.startControlSection("posts_layout", {
      tab: TAB_CONTENT,
      label: "Layout"
    });

    this.addControl("posts_columns", {
      type: CONTROLLER_SELECT,
      label: "Columns",
      prefixClass: 'altrp-columns_',
      options:[
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        },
        {
          label: '3',
          value: 3
        },
        {
          label: '4',
          value: 4
        },
        {
          label: '5',
          value: 5
        },
        {
          label: '6',
          value: 6
        },
      ],
      default: 3,

    });

    this.addControl("posts_card_template", {
      type: CONTROLLER_SELECT2,
      prefetch_options: true,
      label: "Template",
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?template_type=card&value=guid',
      nullable: true,
    });

    this.addControl("posts_card_hover_template", {
      type: CONTROLLER_SELECT2,
      prefetch_options: true,
      label: "Hover Template",
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?template_type=card&value=guid',
      nullable: true,
    });

    this.addControl("posts_transition_type", {
      type: CONTROLLER_SELECT,
      label: "Select Transition Type",
      options: [
        {
          label: 'Left to Right',
          value: 'left'
        },
        {
          label: 'Right to Left',
          value: 'right'
        },
        {
          label: 'Top to Bottom',
          value: 'top'
        },
        {
          label: 'Bottom to Top',
          value: 'bottom'
        },
        {
          label: 'Fade In',
          value: 'fade'
        },
        {
          label: 'Zoom',
          value: 'zoom'
        }
      ],
      default: 'left',
    });

    this.addControl("posts_skin", {
      type: CONTROLLER_SELECT,
      label: "Skin",
      options: [
        {
          label: 'Custom',
          value: 'Custom'
        },
        {
          label: 'Classic',
          value: 'Classic'
        },
        {
          label: 'Cards',
          value: 'Cards'
        },
        {
          label: 'Full Content',
          value: 'Full Content'
        }
      ],
      default: 'Custom',
    });

    this.addControl('posts_per_page', {
      type: CONTROLLER_NUMBER,
      label: 'Posts per page',
      default: 3
    });

    this.addControl("posts_rows_distance", {
      type: CONTROLLER_SLIDER,
      label: 'Rows Distance',
      default: {
        size: 20,
        unit: 'px',
      },
      max: 120,
      min: 0
    });
    
    this.addControl('posts_image', {
      type: CONTROLLER_SWITCHER,
      label: 'Show Thumbnail',
    });

    this.addControl("posts_image_size", {
      type: CONTROLLER_SELECT,
      label: "Image Size",
      options: [
        {
          label: 'Thumbnail - 150 x 150',
          value: 'thumbnail'
        },
        {
          label: 'Medium - 300 x 300',
          value: 'medium'
        },
        {
          label: 'Medium Large - 768 x 0',
          value: 'medium_large'
        },
        {
          label: 'Large - 600 x 1024',
          value: 'large'
        },
        {
          label: '1536 x 1536',
          value: '1536x1536'
        },
        {
          label: '2048 x 2048',
          value: '2048x2048'
        },
        {
          label: 'Full',
          value: 'full'
        }
      ],
      conditions: {
        'posts_image': true,
      },
      default: 'medium',
    });

    this.addControl("posts_image_scale", {
      type: CONTROLLER_SLIDER,
      label: 'Image Aspect Ratio',
      conditions: {
        'posts_image': true,
      },
      default: {
        size: 1,
      },
      max: 2,
      min: 0,
      step: 0.01
    });

    this.addControl("posts_image_width", {
      type: CONTROLLER_SLIDER,
      label: 'Image Width',
      conditions: {
        'posts_image': true,
      },
      default: {
        size: 100,
        unit: '%',
      },
      units: [
        'px',
        '%',
      ],
      max: 600,
      min: 0
    });

    this.addControl('posts_header', {
      type: CONTROLLER_SWITCHER,
      label: 'Header',
    });    

    this.addControl("posts_header_tag", {
      type: CONTROLLER_SELECT,
      label: "Headers Tag",
      conditions: {
        'posts_header': true,
      },
      options: [
        {
          label: 'H1',
          value: 'h1'
        }, 
        {
          label: 'H2',
          value: 'h2'
        },
        {
          label: 'H3',
          value: 'h3'
        },
        {
          label: 'H4',
          value: 'h4'
        },
        {
          label: 'H5',
          value: 'h5'
        },
        {
          label: 'H6',
          value: 'h6'
        },
        {
          label: 'div',
          value: 'div'
        },
        {
          label: 'span',
          value: 'span'
        },
        {
          label: 'p',
          value: 'p'
        }
      ],
      default: 'h3',
    });

    this.endControlSection();

    this.startControlSection("posts_layout_styles", {
      tab: TAB_STYLE,
      label: "Layout"
    });

    this.addControl('posts_alignment', {
      type: CONTROLLER_SELECT,
      label: 'Content Alignment',
      default: 'top',
      options: [
        {
          label: 'top',
          value: 'flex-start',
        },
        {
          label: 'bottom',
          value: 'flex-end',
        }
      ],
      // rules: {
      // },
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': [
      //     'padding-top: {{TOP}}{{UNIT}};',
      //     'padding-right: {{RIGHT}}{{UNIT}};',
      //     'padding-bottom: {{BOTTOM}}{{UNIT}};',
      //     'padding-left: {{LEFT}}{{UNIT}};'
      //   ]
      // },
    });

    this.addControl("posts_bottom_space", {
      type: CONTROLLER_SLIDER,
      label: 'Bottom Space',
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh'
      ],
      max: 50,
      min: 0
    });

    this.addControl("posts_columns_gap", {
      type: CONTROLLER_SLIDER,
      label: 'Columns Gap',
      max: 100,
      min: 0
    });

    this.addControl("posts_rows_gap", {
      type: CONTROLLER_SLIDER,
      label: 'Rows Gap',
      max: 100,
      min: 0
    });

    this.endControlSection();

    this.startControlSection('posts_border_section', {
      tab: TAB_STYLE,
      label: 'Border'
    });

    this.addControl('posts_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Border Type',
      options: [
        {
          'value': 'none',
          'label': 'None',
        },
        {
          'value': 'solid',
          'label': 'Solid',
        },
        {
          'value': 'double',
          'label': 'Double',
        },
        {
          'value': 'dotted',
          'label': 'Dotted',
        },
        {
          'value': 'dashed',
          'label': 'Dashed',
        },
        {
          'value': 'groove',
          'label': 'Groove',
        },
      ],
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-style: {{VALUE}};',
      // },
    }
    );

    this.addControl('posts_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Width',
      default: {
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      // },
    }
    );

    this.addControl('posts_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Border Color',
      // default: {
      //   color: "rgb(50,168,82)",
      //   colorPickedHex: "#32a852",
      // },
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-color: {{COLOR}};',
      // },
    }
    );

    this.addControl('border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': [
      //     'border-top-left-radius: {{TOP}}{{UNIT}}',
      //     'border-top-right-radius: {{RIGHT}}{{UNIT}}',
      //     'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
      //     'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
      //   ]
      // }
    });

    this.addControl('style_background_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
      default: {
        // blur: 0,
        // horizontal: 0,
        // vertical: 0,
        // opacity: 1,
        // spread: 0,
        // colorRGB: 'rgb(0, 0, 0)',
        // color: 'rgb(0, 0, 0)',
        // colorPickedHex: '#000000',
        // type: ""
      },
      presetColors: [
        '#eaeaea',
        '#9c18a8'
      ],
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      // },
    });

    this.endControlSection();

    this.startControlSection('posts_background_section', {
      tab: TAB_STYLE,
      label: 'Background'
    });

    this.addControl('posts_background_color', {
      type: CONTROLLER_COLOR,
      label: 'Background color',
      // default: {
      //   color: "rgb(52,59,76)",
      //   colorPickedHex: "#343B4C",
      // },
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': 'background-color: {{COLOR}};',
      // },
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
        angle: "0",
        value: ""
      },
      // rules: {
      //   "{{ELEMENT}} .altrp-btn{{STATE}}": "background-image: {{VALUE}}"
      // }
    });

    this.addControl('posts_background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
      default: { url: "" },
      // rules: {
      //   "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-image: url({{URL}});"
      // }
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
      // rules: {
      //   "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-position: {{VALUE}};"
      // }
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
      // rules: {
      //   "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-attachment: {{VALUE}};"
      // }
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
      // rules: {
      //   "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-repeat: {{VALUE}};"
      // }
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
      // rules: {
      //   "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-size: {{SIZE}}{{UNIT}};"
      // }
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
      // rules: {
      //   "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-size: {{VALUE}};"
      // }
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Table;
