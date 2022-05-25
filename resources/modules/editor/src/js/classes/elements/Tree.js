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
  CONTROLLER_SLIDER, CONTROLLER_COLOR, CONTROLLER_TYPOGRAPHIC, CONTROLLER_DIMENSIONS, CONTROLLER_SHADOW
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
      ],
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
      label: 'Datasource path',
      type: CONTROLLER_TEXTAREA,
      conditions: {
        'select_type': "datasource",
      },
    });

    let repeaterColumns = new Repeater();

    repeater.addControl('repeater_column_label', {
      type: CONTROLLER_TEXT,
      label: "Label",
    });

    repeater.addControl('repeater_column_value', {
      type: CONTROLLER_TEXT,
      label: "Value",
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

    this.addControl('cursor', {
      type: CONTROLLER_SWITCHER,
      label: "Cursor pointer",
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
      units: [
        'px',
        '%',
      ],
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
        units: [
          'px',
          '%',
          'vh',
        ],
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
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl('border_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
    });

    this.endControlSection();

    this.startControlSection('typographic_section', {
      tab: TAB_STYLE,
      label: 'Typographic',
    });

    this.addControl('typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('typographic_color', {
      type: CONTROLLER_COLOR,
      label: 'Color',
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
      units: [
        'px',
        '%',
      ],
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

    advancedTabControllers(this);
  }
}

export default Tree;
