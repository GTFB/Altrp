import BaseElement from "./BaseElement";
import ImageIcon from '../../../svgs/image.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
  CONTROLLER_MEDIA,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SLIDER,  
  CONTROLLER_TEXT,
  CONTROLLER_SELECT,
  CONTROLLER_FILTERS,
  CONTROLLER_CHOOSE,
  CONTROLLER_COLOR,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED
} from "../modules/ControllersManager";

class Image extends BaseElement{
	static getName(){
    return'image';
  }
  static getTitle(){
    return'Image';
  }

  static getIconComponent(){
    return ImageIcon;
  }
  static getType(){
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('content_section', {
      tab: TAB_CONTENT,
      label: 'Content',
    });

    this.addControl('content_media', {
      type: CONTROLLER_MEDIA,
      label: 'Choose image',
    });

    this.endControlSection();

    this.startControlSection('style_section', {
      tab: TAB_STYLE,
      label: ''
    })

    this.endControlSection();

    this.startControlSection('postion_style_section', {
      tab: TAB_STYLE,
      label: ''
    })

    this.addControl('position_margin', {
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
        '{{ELEMENT}} img': [ 
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
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
        '{{ELEMENT}} div': [ 
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('position_z_index', {
      type: CONTROLLER_NUMBER,
      label: 'Z-index',
      default: 0,
      rules: {
        '{{ELEMENT}} img': 'z-index: {{VALUE}}'
      }
    });

    this.addControl('position_css_id', {
      type: CONTROLLER_TEXT,
      label: 'CSS ID'
    });

    this.addControl('position_css_classes', {
      type: CONTROLLER_TEXT,
      label: 'CSS Classes'
    });

    this.endControlSection();

    this.startControlSection('overlay_section', {
      tab: TAB_STYLE,
      label: 'Overlay',
    });

    this.addControl('opacity_overlay', {
      type: CONTROLLER_SLIDER,
      label: 'Opacity',
      default:{
        size: 1,
      },
      max: 1,
      min: 0,
      step: 0.01,
      rules: {
        '{{ELEMENT}} img': 'opacity: {{SIZE}}',
      },
    });

    this.endControlSection();

    this.startControlSection('size_section', {
      tab: TAB_STYLE,
      label: 'Size',
    });

    this.addControl('image_fit_size', {
        type: CONTROLLER_SELECT,
        label: 'Image fit',

        options:[
          {
            'value' : 'cover',
            'label' : 'cover',
          },
          {
            'value' : 'contain',
            'label' : 'contain',
          }
        ],
        rules: {
          '{{ELEMENT}} img': 'object-fit: {{VALUE}};',
        },
      }
    );
    
    this.addControl('aspect_ratio_size', {
        type: CONTROLLER_SELECT,
        label: 'Aspect ratio',

        options:[
          {
            'value' : '100',
            'label' : 'default',
          },
          {
            'value' : '-75',
            'label' : '3:4',
          },
          {
            'value' : '56.25',
            'label' : '16:9',
          },
          {
            'value' : '-56.25',
            'label' : '9:16',
          },
          {
            'value' : '75',
            'label' : '4:3',
          }
        ],
        rules: {
        },
      }
    );

    this.addControl('height_size', {
      type: CONTROLLER_NUMBER,
      label: 'Height',
      default: "100",
      rules: {
        '{{ELEMENT}} img': 'height: {{VALUE}}%;',
      },
    });

    this.addControl('width_size', {
      type: CONTROLLER_NUMBER,
      label: 'Width',
      default: "100",
      rules: {
        '{{ELEMENT}} img': 'width: {{VALUE}}%;',
      },
    });

    this.endControlSection();

    this.startControlSection('image_style_section', {
      tab: TAB_STYLE,
      label: 'image'
    });

    this.addControl('image_style_text_shadow', {
        type: CONTROLLER_FILTERS,
        label: 'filters',
        rules: {
          '{{ELEMENT}} img': [
            'filter: blur({{BLUR}}px);',
            'filter: brightness({{BRIGHTNESS}}%);',
            'filter: contrast({{CONTRAST}}%);',
            'filter: saturate({{SATURATION}}%);',
            'filter: hue-rotate({{HUE}}deg);;'
        ],
        },
      }
    );

    this.addControl('image_style_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'alignment',
      default: 'center',
      options:[
        {
          icon: 'left',
          value: 'flex-start',
        },
        {
          icon: 'center',
          value: 'center',
        },
        {
          icon: 'right',
          value: 'flex-end',
        },
      ],
      rules: {
            '{{ELEMENT}} .altrp-image-container': 'justify-content: {{VALUE}};',
      },
    });

    this.endControlSection();

    this.startControlSection('border_section', {
      tab: TAB_STYLE,
      label: 'Border'
    });

    this.addControl('border_type', {
        type: CONTROLLER_SELECT,
        label: 'Border Type',
        units:[
          'px',
          '%',
          'vh',
        ],
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
          '{{ELEMENT}} img': 'border-style: {{VALUE}};',
        },
      }
    );
  
    this.addControl('border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        units:[
          'px',
          '%',
          'vh',
        ],
        rules: {
          '{{ELEMENT}} img': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );
  
    this.addControl('border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
        default: {
          color: "rgb(50,168,82)",
          colorPickedHex: "#32a852",
        },
        rules: {
          '{{ELEMENT}} img': 'border-color: {{COLOR}};',
        },
      }
    );
    
    this.addControl('border_radius', {
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
        '{{ELEMENT}} img': 'border-radius: {{SIZE}}{{UNIT}}',
      },
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Image