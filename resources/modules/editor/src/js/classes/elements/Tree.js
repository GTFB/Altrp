import BaseElement from "./BaseElement";
import Preview from "../../../svgs/tree.svg";
import {
  CONTROLLER_SWITCHER,
  TAB_CONTENT,
  CONTROLLER_REPEATER,
  CONTROLLER_ELEMENTS,
  CONTROLLER_TEXTAREA,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_MEDIA,
  CONTROLLER_NUMBER,
  TAB_STYLE,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SHADOW,
  CONTROLLER_SELECT2
} from '../modules/ControllersManager';
import Repeater from "../Repeater";
import {advancedTabControllers} from "../../decorators/register-controllers";

class Tree extends BaseElement {
  static getName() {
    return "tree";
  }
  static getTitle() {
    return "Tree";
  }
  static getIconComponent() {
    return Preview;
  }
  static getType() {
    return "widget";
  }
  static getGroup() {
    return "Advanced";
  }

  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    let repeater = new Repeater();

    repeater.addControl('label', {
      type: CONTROLLER_TEXT,
      label: "Label",
    });

    repeater.addControl('icon', {
      type: CONTROLLER_MEDIA,
      label: 'Icon',
    });

    repeater.addControl('tree_id', {
      type: CONTROLLER_NUMBER,
      label: 'Id',
    });

    repeater.addControl('parent', {
      type: CONTROLLER_NUMBER,
      label: 'Parent id',
    });

    this.startControlSection('tree_section', {
      tab: TAB_CONTENT,
      label: 'Tree'
    });

    this.addControl('select_type', {
      type: CONTROLLER_SELECT,
      label: 'Type',
      default: "repeater",
      options: [
        {
          value: 'repeater',
          label: 'Repeater'
        },
        {
          value: 'datasource',
          label: 'Datasource'
        },
        {
          value: 'menu',
          label: 'Menu'
        },
      ],
      locked: true,
    });

    this.addControl('menu', {
      type: CONTROLLER_SELECT2,
      responsive: false,
      prefetch_options: true,
      label: 'Menu',
      isClearable: true,
      conditions: {
        select_type: 'menu'
      },
      options_resource: '/admin/ajax/menus/options?value=guid',
      nullable: true,
      after: <div className="control-button-container mt-2">
        <a target="_blank" href="/admin/menus" className="btn btn_success">Edit Menus</a>
      </div>,
      locked: true,
    });

    this.addControl("tree_repeater", {
      type: CONTROLLER_REPEATER,
      default: [],
      fields: repeater.getControls(),
      conditions: {
        'select_type': "repeater",
      },
      locked: true,
    });


    this.addControl('tree_from_datasource', {
      locked: true,
      label: 'Datasource path',
      type: CONTROLLER_TEXTAREA,
      conditions: {
        'select_type': "datasource",
      },
    });

    let repeaterColumns = new Repeater();

    repeaterColumns.addControl('label', {
      type: CONTROLLER_TEXT,
      label: "Label",
    });

    repeaterColumns.addControl("label_width", {
      type: CONTROLLER_SLIDER,
      label: 'Heading width',
      default: {
        unit: 'px',
      },
      units: [
        'fr',
        'px',
        '%',
      ],
      max: 300,
      min: 1,
    });

    repeaterColumns.addControl('value', {
      type: CONTROLLER_TEXT,
      label: "Value",
    });


    repeaterColumns.addControl("width", {
      type: CONTROLLER_SLIDER,
      label: 'Value width',
      default: {
        unit: 'px',
      },
      units: [
        'fr',
        'px',
        '%',
      ],
      max: 300,
      min: 1,
    });

    repeaterColumns.addControl('divider', {
      type: CONTROLLER_SWITCHER,
      label: "Divider",
    });

    this.addControl("column_repeater", {
      type: CONTROLLER_REPEATER,
      default: [],
      fields: repeaterColumns.getControls(),
      conditions: {
        'select_type': "datasource",
      },
      label: "Add columns",
      locked: true,
    });

    // this.addControl('icon', {
    //   type: CONTROLLER_MEDIA,
    //   label: 'Icon',
    // });

    this.addControl('caret_r', {
      type: CONTROLLER_SWITCHER,
      label: "carriage on the right",
      locked: true
    });

    this.addControl('columns_heading_activator', {
      type: CONTROLLER_SWITCHER,
      label: "Columns heading",
      locked: true
    });

    this.addControl('flat_col', {
      type: CONTROLLER_SWITCHER,
      label: "Flat column",
      locked: true
    });

    this.endControlSection();

    this.startControlSection('content_style', {
      tab: TAB_STYLE,
      label: 'Content',
    });

    this.addControl("width", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 2000,
      min: 100,
    });

    this.endControlSection();

    this.startControlSection('item_section', {
      tab: TAB_STYLE,
      label: 'Item',
    });

    this.addControl("item_height", {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 16,
    });

    this.addControl('item_background', {
      type: CONTROLLER_COLOR,
      label: 'Background',
    });

    this.endControlSection();

    this.startControlSection('border_section', {
      tab: TAB_STYLE,
      label: 'Border',
    });

    this.addControl('border_type', {
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
      }
    );

    this.addControl('border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        default: {
          bind: true,
        },
        units: ['px', '%', 'vh', 'vw'],
      }
    );

    this.addControl('border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
      }
    );

    this.addControl('border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px',
        bind: true,
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('border_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
    });

    this.endControlSection();

    this.startControlSection('divider_section', {
      tab: TAB_STYLE,
      label: 'Divider',
    });

    this.addControl('divider_type', {
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
      }
    );

    this.addControl("divider_size", {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.addControl('divider_color', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    });

    this.addControl("divider_gap", {
      type: CONTROLLER_SLIDER,
      label: 'Gap',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection('icon_section', {
      tab: TAB_STYLE,
      label: 'Icon',
    });

    this.addControl("icon_size", {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.addControl('icon_fill', {
      type: CONTROLLER_COLOR,
      label: 'Fill',
    });

    this.addControl('icon_stroke', {
      type: CONTROLLER_COLOR,
      label: 'Stroke',
    });

    this.endControlSection();

    this.startControlSection('heading_columns', {
      tab: TAB_STYLE,
      label: 'Heading columns',
    });

    this.addControl('heading_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
        bind: true,
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('heading_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default: {
        unit: 'px',
        bind: true,
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('heading_background', {
      type: CONTROLLER_COLOR,
      label: 'Background color',
    });

    this.addControl('heading_column_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Column padding',
      default: {
        unit: 'px',
        bind: true,
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('heading_gap', {
      type: CONTROLLER_SLIDER,
      label: 'Gap',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.addControl('heading_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('heading_color', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    });

    this.addControl('heading_column_background', {
      type: CONTROLLER_COLOR,
      label: 'Column background color',
    });

    this.addControl('heading_border_type', {
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
      }
    );

    this.addControl('heading_border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        default: {
          bind: true,
        },
        units: ['px', '%', 'vh', 'vw'],
      }
    );

    this.addControl('heading_border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
      }
    );

    this.addControl('heading_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px',
        bind: true,
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('heading_border_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
    });

    this.endControlSection();

    this.startControlSection('style_columns', {
      tab: TAB_STYLE,
      label: 'Columns',
    });

    this.addControl('column_gap', {
      type: CONTROLLER_SLIDER,
      label: 'Gap',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.addControl('column_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('column_color', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    });

    this.endControlSection();


    advancedTabControllers(this);
  }
}

export default Tree;
