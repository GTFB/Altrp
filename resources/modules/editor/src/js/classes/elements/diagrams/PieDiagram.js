import Schemes from "../../../components/altrp-dashboards/settings/NivoColorSchemes.js";
import BaseElement from ".././BaseElement";
import PieIcon from "../../../../svgs/skill-bar.svg";
import { advancedTabControllers } from "../../../decorators/register-controllers";
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  CONTROLLER_SWITCHER,
  CONTROLLER_QUERY,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_TEXT,
  CONTROLLER_REPEATER,
  CONTROLLER_COLOR,
  CONTROLLER_NUMBER,
  CONTROLLER_RANGE,
  CONTROLLER_DATE,
  CONTROLLER_SHADOW,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_CHOOSE
} from "../../modules/ControllersManager";

import {actionsControllers} from "../../../decorators/actions-controllers";

import {
  TABLE,
  widgetTypes
} from "../../../../../../admin/src/components/dashboard/widgetTypes";
import Repeater from "../../Repeater";

class PieDiagram extends BaseElement {
  static getName() {
    return "pie-diagram";
  }
  static getTitle() {
    return "Pie Diagram";
  }
  static getIconComponent() {
    return PieIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("content_section", {
      tab: TAB_CONTENT,
      label: "Content"
    });

    this.addControl("query", {
      type: CONTROLLER_QUERY
    });

    this.addControl("datasource_title", {
      dynamic: false,
      label: "Title"
    });

    this.addControl("subtitle", {
      dynamic: false,
      label: "Subtitle"
    });

    this.addControl("datasource_path", {
      dynamic: false,
      label: "Path to Data"
    });

    this.addControl("key_name", {
      dynamic: false,
      label: "Key Field (X)"
    });

    this.addControl("key_is_date", {
      dynamic: false,
      default: false,
      label: "Key has Date format?",
      type: CONTROLLER_SWITCHER
    });

    this.addControl("data_name", {
      dynamic: false,
      label: "Data Field (Y)"
    });

    this.addControl("sort", {
      type: CONTROLLER_SELECT,
      label: "Сортировка",
      default: false,
      options: [
        {
          id: 0,
          value: "",
          label: "По умолчанию"
        },
        {
          id: 1,
          value: "value",
          label: "По значению"
        },
        {
          id: 2,
          value: "key",
          label: "По ключу"
        }
      ]
    });

    this.addControl("customTooltip", {
      type: CONTROLLER_SWITCHER,
      label: "Use custom tooltip?",
      default: false
    });

    this.addControl("use_legend", {
      type: CONTROLLER_SWITCHER,
      label: "Use legend?",
      default: false
    });

    this.addControl("useCenteredMetric", {
      type: CONTROLLER_SWITCHER,
      label: "Use centered metric?",
      default: false
    });
    
    this.addControl("useProcent", {
      type: CONTROLLER_SWITCHER,
      label: "Add procent?",
      default: false
    });
    
    this.addControl("useLinkArcLabels", {
      type: CONTROLLER_SWITCHER,
      label: "Use link arc labels?",
      default: true
    });

    this.endControlSection();

    this.startControlSection("main", {
      tab: TAB_CONTENT,
      dynamic: false,
      label: "Main"
    });

    this.addControl("widget_name", {
      dynamic: false,
      label: "Widget name"
    });

    this.endControlSection();

    actionsControllers(this);

    this.startControlSection("style", {
      tab: TAB_STYLE,
      label: "Visual style"
    });

    const colors = Schemes.map(object => {
      return { label: object.label, value: object.value };
    });
    
    this.addControl("activeOuterRadiusOffset", {
      type: CONTROLLER_NUMBER,
      label: "Active outer radius offset"
    });
    
    this.addControl("activeInnerRadiusOffset", {
      type: CONTROLLER_NUMBER,
      label: "Active inner radius offset"
    });

    this.addControl("innerRadius", {
      type: CONTROLLER_RANGE,
      label: "Inner radius",
      min: 0,
      max: 0.95,
      step: 0.05
    });

    this.addControl("padAngle", {
      type: CONTROLLER_RANGE,
      label: "Угол между секторами",
      min: 0,
      max: 45,
      step: 1
    });

    this.addControl("colorScheme", {
      type: CONTROLLER_SELECT,
      label: "Color Scheme",
      default: "regagro",
      options: colors
    });

    this.addControl("yScaleMax", {
      type: CONTROLLER_NUMBER,
      label: "Y scale max"
    });

    this.addControl("bottomAxis", {
      type: CONTROLLER_SWITCHER,
      label: "Отобразить нижнюю легенду",
      default: true
    });

    this.addControl("tickRotation", {
      type: CONTROLLER_RANGE,
      label: "Наклон нижней легенды",
      default: 0,
      min: -90,
      max: 90,
      step: 1
    });

    this.addControl("enableRadialLabels", {
      type: CONTROLLER_SWITCHER,
      label: "Внешние подписи к секторам",
      default: false,
    });

    this.addControl("cornerRadius", {
      type: CONTROLLER_RANGE,
      label: "Скругление углов",
      default: 0,
      min: 0,
      max: 45,
      step: 1,
    });

    this.addControl("sortByValue", {
      type: CONTROLLER_SWITCHER,
      label: "Сортировка по значению",
      default: false,
    });

    this.addControl("enableSliceLabels", {
      type: CONTROLLER_SWITCHER,
      label: "Отобразить данные на секторах",
      default: false,
    });

    this.endControlSection();

    this.startControlSection("title_styles", {
      tab: TAB_STYLE,
      label: "Title",
    });

    this.addControl('title_color', {
      label: 'Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('title_typography', {
      label: 'Typography',
      type: CONTROLLER_TYPOGRAPHIC,
    })

    this.addControl("title_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      units: ["px", "%", "vh"],
    });

    this.addControl('title_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      options: [
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
        }
      ],
    });

    this.endControlSection()
    
    this.startControlSection("subtitle_styles", {
      tab: TAB_STYLE,
      label: "Subtitle",
    });

    this.addControl('subtitle_color', {
      label: 'Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('subtitle_typography', {
      label: 'Typography',
      type: CONTROLLER_TYPOGRAPHIC,
    })

    this.addControl("subtitle_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      units: ["px", "%", "vh"],
    });

    this.addControl('subtitle_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      options: [
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
        }
      ],
    });

    this.endControlSection()
    
    this.startControlSection("legend_styles", {
      tab: TAB_STYLE,
      label: "Legend",
    });

    this.addControl('legend_anchor', {
      type: CONTROLLER_SELECT,
      label: 'Anchor',
      options: [
        {
          label: 'top',
          value: 'top'
        },
        {
          label: 'top-right',
          value: 'top-right'
        },
        {
          label: 'right',
          value: 'right',
        },
        {
          label: 'bottom-right',
          value: 'bottom-right'
        },
        {
          label: 'bottom',
          value: 'bottom',
        },
        {
          label: 'bottom-left',
          value: 'bottom-left',
        },
        {
          label: 'left',
          value: 'left',
        },
        {
          label: 'top-left',
          value: 'top-left',
        }
      ]
    })

    this.addControl("legend_direction", {
      type: CONTROLLER_SELECT,
      label: "Direction",
      options: [
        {
          label: 'column',
          value: 'column'
        },
        {
          label: 'row',
          value: 'row'
        },
      ],
      default: 'column'
    });

    this.addControl("legend_item_direction", {
      type: CONTROLLER_SELECT,
      label: "Legend item direction",
      options: [
        {
          label: 'left-to-right',
          value: 'left-to-right'
        },
        {
          label: 'right-to-left',
          value: 'right-to-left'
        },
        {
          label: 'top-to-bottom',
          value: 'top-to-bottom'
        },
        {
          label: 'bottom-to-top',
          value: 'bottom-to-top'
        },
      ],
      default: 'left-to-right'
    });
    
    this.addControl("legend_translate_x", {
      type: CONTROLLER_NUMBER,
      label: "TranslateX",
    });
    
    this.addControl("legend_translate_y", {
      type: CONTROLLER_NUMBER,
      label: "TranslateY",
    });

    this.addControl("legend_items_spacing", {
      type: CONTROLLER_NUMBER,
      label: "Items Spacing",
    });
    
    this.addControl("legend_item_width", {
      type: CONTROLLER_NUMBER,
      label: "Item Width",
    });

    this.addControl("legend_item_height", {
      type: CONTROLLER_NUMBER,
      label: "Item Height",
    });

    this.addControl("legend_item_opacity", {
      type: CONTROLLER_RANGE,
      label: "Item Opacithy",
      default: 1,
      min: 0,
      max: 1,
      step: 0.01
    });
    
    this.addControl("legend_symbol_size", {
      type: CONTROLLER_NUMBER,
      label: "Symbol size",
    });

    this.addControl("legend_symbol_shape", {
      type: CONTROLLER_SELECT,
      label: "Symbol shape",
      options: [
        {
          label: 'square',
          value: 'square'
        },
        {
          label: 'circle',
          value: 'circle'
        },
        {
          label: 'triangle',
          value: 'triangle'
        },
        {
          label: 'diamond',
          value: 'diamond'
        },
      ],
    });

    this.endControlSection()

    this.startControlSection("Tooltip", {
      tab: TAB_STYLE,
      label: "Tooltip style",
      default: "|"
    });

    this.addControl("style_margin_tooltip", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        unit: "px",
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    this.addControl("style_padding_tooltip", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        unit: "px",
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    this.addControl("style_width_tooltip", {
      type: CONTROLLER_NUMBER,
      label: "Width",
      default: {
        width: 350,
        unit: "px",
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    this.addControl("style_font_tooltip", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.addControl("style_font_color_tooltip", {
      type: CONTROLLER_COLOR,
      label: "Typographic color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("style_background_color_tooltip", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("style_background_tooltip_shadow", {
      type: CONTROLLER_SHADOW,
      label: "Shadow",
    });

    this.addControl("border_type_tooltip", {
      type: CONTROLLER_SELECT,
      label: "Border Type",
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

    this.addControl("border_width_tooltip", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      default: {
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    this.addControl("border_color_tooltip", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
    });

    this.endControlSection();

    this.startControlSection("custom_color_scheme", {
      tab: TAB_STYLE,
      label: "Custom color scheme"
    });

    let repeaterScheme = new Repeater();

    repeaterScheme.addControl("color", {
      label: "Color",
      type: CONTROLLER_COLOR,
      dynamic: false
    });

    this.addControl("isCustomColor", {
      type: CONTROLLER_SWITCHER,
      label: "Use custom color scheme?",
      default: false
    });

    this.addControl("customScheme", {
      type: CONTROLLER_REPEATER,
      default: [],
      fields: repeaterScheme.getControls()
    });

    this.endControlSection();

    this.startControlSection("size", {
      tab: TAB_STYLE,
      label: "Size"
    });

    this.addControl("width", {
      type: CONTROLLER_SLIDER,
      label: "width",
      default: {
        size: 100,
        unit: "%"
      },
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
    });

    this.addControl("height", {
      type: CONTROLLER_SLIDER,
      label: "height",
      default: {
        size: 420,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
    });

    this.addControl("margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
        unit: "px",
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    this.endControlSection()
    
    this.startControlSection("centered_metric", {
      tab: TAB_STYLE,
      label: "Center metric"
    });

    this.addControl('centered_metric_typography', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typography'
    })

    this.addControl('centered_metric_color', {
      type: CONTROLLER_COLOR,
      label: 'Text color',
    })

    this.endControlSection()

    this.startControlSection("arc_label", {
      tab: TAB_STYLE,
      label: "Arc label"
    });

    this.addControl('arc_label_typography', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typography'
    })

    this.addControl('arc_label_color', {
      type: CONTROLLER_COLOR,
      label: 'Color'
    })

    this.endControlSection()

    advancedTabControllers(this);
  }
}
export default PieDiagram;
