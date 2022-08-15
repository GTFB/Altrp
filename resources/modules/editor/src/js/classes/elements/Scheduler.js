import BaseElement from "./BaseElement";
import TestIcon from "../../../svgs/accordion.svg";
import { TAB_STYLE, CONTROLLER_REPEATER, CONTROLLER_SELECT, CONTROLLER_TEXT, TAB_CONTENT, CONTROLLER_COLOR, CONTROLLER_DIMENSIONS, CONTROLLER_SLIDER, CONTROLLER_TYPOGRAPHIC } from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Scheduler extends BaseElement {
  static getTitle() {
    return "Scheduler";
  }

  static getName() {
    return "scheduler";
  }

  static getType() {
    return "widget";
  }

  static getIconComponent() {
    return TestIcon;
  }

  static getGroup() {
    return "Advanced";
  }

  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }


    this.startControlSection("web_api_settings", {
      tab: TAB_CONTENT,
      label: "Web API settings",
    });


    this.addControl('get_url', {
      type: CONTROLLER_TEXT,
      label: 'URL for get',
      locked: true,
    });

    this.addControl('create_url', {
      type: CONTROLLER_TEXT,
      label: 'URL for create',
      locked: true,
    });

    this.addControl('update_url', {
      type: CONTROLLER_TEXT,
      label: 'URL for update',
      locked: true,
    });

    this.addControl('delete_url', {
      type: CONTROLLER_TEXT,
      label: 'URL for delete requests',
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("scheduler_content", {
      tab: TAB_CONTENT,
      label: "Items fields settings",
    });

    let repeater = new Repeater();

    repeater.addControl('label_repeater', {
      type: CONTROLLER_TEXT,
      label: 'Label',
    });

    repeater.addControl('field_name_repeater', {
      type: CONTROLLER_TEXT,
      label: 'Field name',
    });

    repeater.addControl('input_type_repeater', {
      type: CONTROLLER_SELECT,
      label: 'Input type',
      default: 'text',
      options: [
        {
          value: 'text',
          label: 'Text'
        },
        {
          value: 'textarea',
          label: 'TextArea'
        },
      ]
    });

    this.addControl('repeater_fields_section', {
      label: 'Scheduler fields',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls()
    });

    this.endControlSection();


    this.startControlSection("localization", {
      tab: TAB_CONTENT,
      label: "Localization",
    });

    this.addControl('lang', {
      label: 'Language',
      type: CONTROLLER_SELECT,
      default: 'en-gb',
      options: [
        {
          value: 'en-gb',
          label: 'En'
        },
        {
          value: 'ru',
          label: 'Ru'
        },
      ],
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('style_switcher', {
      label: 'Switcher',
      tab: TAB_STYLE
    });

    this.addControl('switcher_bgc', {
      label: 'Background color',
      type: CONTROLLER_COLOR,
    })

    this.addControl("switcher_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border type",
      default: 'solid',
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

    this.addControl("switcher_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("switcher_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
    });


    this.addControl('switcher_typography', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
      }
    );

    this.endControlSection();

    this.startControlSection('style_title', {
      label: 'Toolbar title',
      tab: TAB_STYLE
    });

    this.addControl('toolbar_title_color', {
      type: CONTROLLER_COLOR,
      label: 'Title color',
    })

    this.addControl('toolbar_title_typography', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
      }
    );

    this.endControlSection();

    this.startControlSection('calendar_table_styles', {
      label: 'Calendar table',
      tab: TAB_STYLE
    });

    // this.addControl("table_border_type", {
    //   type: CONTROLLER_SELECT,
    //   label: "Border type",
    //   default: 'solid',
    //   options: [
    //     {
    //       value: "none",
    //       label: "None"
    //     },
    //     {
    //       value: "solid",
    //       label: "Solid"
    //     },
    //     {
    //       value: "double",
    //       label: "Double"
    //     },
    //     {
    //       value: "dotted",
    //       label: "Dotted"
    //     },
    //     {
    //       value: "dashed",
    //       label: "Dashed"
    //     },
    //     {
    //       value: "groove",
    //       label: "Groove"
    //     }
    //   ],
    // });

    // this.addControl("table_border_width", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Border width",
    //   default: {
    //     top: 1,
    //     right: 1,
    //     bottom: 1,
    //     left: 1,
    //     unit: "px",
    //     bind: true
    //   },
    //   units: ["px", "%", "vh"],
    // });

    this.addControl("table_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
    });

    // this.addControl("table_border_radius", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Radius",
    //   units: ["px", "%", "vh"],
    // });

    this.endControlSection();

    this.startControlSection('header_cells_style', {
      label: 'Header cells',
      tab: TAB_STYLE
    });

    this.addControl("header_cell_color", {
      type: CONTROLLER_COLOR,
      label: "Text color",
    });

    this.addControl("header_cell_background-color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
    });

    this.addControl('header_cell_typography', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
      }
    );

    this.endControlSection();

    this.startControlSection('active_cell_style', {
      label: 'Active cells',
      tab: TAB_STYLE
    });

    this.addControl("active_cell_color", {
      type: CONTROLLER_COLOR,
      label: "Text color",
    });

    this.addControl("active_cell_background-color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
    });

    this.addControl('active_cell_typography', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
      }
    );

    this.endControlSection();

    this.startControlSection('muted_cell_style', {
      label: 'Muted cells',
      tab: TAB_STYLE
    });

    this.addControl("muted_cell_color", {
      type: CONTROLLER_COLOR,
      label: "Text color",
    });

    this.addControl("muted_cell_background-color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
    });

    this.addControl('muted_cell_typography', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
      }
    );

    this.endControlSection();

    this.startControlSection('current_cell_style', {
      label: 'Current cell',
      tab: TAB_STYLE
    });

    this.addControl("current_cell_color", {
      type: CONTROLLER_COLOR,
      label: "Text color",
    });

    this.addControl("current_cell_background-color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
    });

    this.addControl('current_cell_typography', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
      }
    );

    this.endControlSection();

    this.startControlSection('event_style', {
      label: 'Event',
      tab: TAB_STYLE
    });

    this.addControl("event_color", {
      type: CONTROLLER_COLOR,
      label: "Text color",
    });

    this.addControl("event_background-color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
    });

    this.addControl('event_typography', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
      }
    );

    this.addControl("event_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border type",
      default: 'solid',
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

    this.addControl("event_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("event_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
    });

    this.addControl("event_border_radius", {
      type: CONTROLLER_SLIDER,
      label: 'Border radius',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Scheduler;
