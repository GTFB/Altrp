import BaseElement from "./BaseElement";
import TabsIcon from "../../../svgs/tabs.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_SWITCHER,
  CONTROLLER_COLOR,
  TAB_ADVANCED,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_HEADING,
  CONTROLLER_MEDIA,
  CONTROLLER_TEXT,
  CONTROLLER_REPEATER,
  CONTROLLER_SLIDER,
  CONTROLLER_TYPOGRAPHIC,
  TAB_CONTENT,
  CONTROLLER_LINK,
  TAB_STYLE,
  CONTROLLER_CHOOSE,
  CONTROLLER_NUMBER,
  CONTROLLER_WYSIWYG, CONTROLLER_SHADOW
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import {advancedTabControllers} from "../../decorators/register-controllers";

class Tabs extends BaseElement {
  static getName() {
    return "tabs";
  }

  static getTitle() {
    return "Tabs";
  }

  static getIconComponent() {
    return TabsIcon;
  }

  static getType() {
    return "widget";
  }

  static getGroup() {
    return "Basic";
  }

  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("tabs_content", {
      tab: TAB_CONTENT,
      label: "Tabs"
    });

    let repeater = new Repeater();

    repeater.addControl('title_and_content_items', {
      type: CONTROLLER_TEXT,
      label: 'Title & content',
      default: 'tab'
    });

    repeater.addControl('icon_items', {
      type: CONTROLLER_MEDIA,
      label: 'icon',
    });

    repeater.addControl("wysiwyg_items", {
      type: CONTROLLER_TEXTAREA,
      label: "Text",
      default: "text"
    });

    repeater.addControl("card_template", {
      type: CONTROLLER_SELECT2,
      prefetch_options: true,
      label: "Template",
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?value=guid',
      gotoLink: {
        linkTemplate: '/admin/editor?template_id={id}',
        textTemplate: 'Go to Template',
      },
      nullable: true,
    });

    this.addControl('items_tabs', {
      label: 'Tab Items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
      default: [
        {
          title_and_content_items: "tab #1",
          id: 1,
          wysiwyg_items: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
          title_and_content_items: "tab #2",
          id: 2,
          wysiwyg_items: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        }
      ]
    });

    this.addControl('alignment_tabs', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      options: [
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
        {
          icon: 'in_width',
          value: 'space-between',
        },
      ],
    });

    this.endControlSection();

    this.startControlSection("tabs_settings", {
      tab: TAB_CONTENT,
      label: "Settings"
    });

    this.addControl('vertical', {
      type: CONTROLLER_SWITCHER,
      label: 'Vertical',
      locked: true,
    });

    this.addControl('animate', {
      type: CONTROLLER_SWITCHER,
      label: 'Animate',
      locked: true,
    });


    this.addControl("spacing_column_tabs", {
      type: CONTROLLER_SLIDER,
      label: "Tab Spacing",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      max: 100,
      min: 0,
    });

    this.addControl("spacing_content_tabs", {
      type: CONTROLLER_SLIDER,
      label: "Content Spacing",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      max: 100,
      min: 0,
    });

    this.endControlSection()

    this.startControlSection("tab_style", {
      tab: TAB_STYLE,
      label: "Tab"
    });

    this.addControl("padding_tab_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      stateless: true,
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("background_tab_style", {
      type: CONTROLLER_COLOR,
      label: "Background tabs",
    });

    this.addControl("background_type_tab_style", {
      type: CONTROLLER_COLOR,
      label: "Background buttons",
    });

    this.addControl("background_text_color_tab_style", {
      type: CONTROLLER_COLOR,
      label: "Text color",
    });

    this.addControl('box_shadow_tab_style', {
        type: CONTROLLER_SHADOW,
        label: 'Box shadow',
      }
    );

    this.addControl("border_type_tab_style", {
      type: CONTROLLER_SELECT,
      label: "Border type",
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

    this.addControl("border_width_tab_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("border_color_tab_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
    });

    this.addControl("border_radius_tab_style", {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('typographic_tab_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.endControlSection();

    this.startControlSection("indicator_style", {
      tab: TAB_STYLE,
      label: "Indicator"
    });

    this.addControl('indicator_color', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    });

    this.endControlSection();

    this.startControlSection("content_style", {
      tab: TAB_STYLE,
      label: "Content"
    });

    this.addControl("padding_content_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      stateless: true,
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("background_content_style", {
      type: CONTROLLER_COLOR,
      label: "Background Content",
      presetColors: ["#eaeaea", "#9c18a8"],
    });

    this.addControl("text_color_content_style", {
      type: CONTROLLER_COLOR,
      label: "Text color",
      presetColors: ["#eaeaea", "#9c18a8"],
    });

    this.addControl("border_type_content_style", {
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
    });

    this.addControl("border_width_content_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("border_color_content_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
    });

    this.addControl("border_radius_content_style", {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('typographic_content_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.endControlSection();

    this.startControlSection("icon_style", {
      tab: TAB_STYLE,
      label: "Icon"
    });

    this.addControl("i_size", {
      type: CONTROLLER_SLIDER,
      label: "Size",
      stateless: true,
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      max: 100,
      min: 0,
    });

    this.addControl('alignment_icon_style', {
      type: CONTROLLER_CHOOSE,
      stateless: true,
      label: 'Alignment',
      options: [
        {
          icon: 'block_left',
          value: 'left',
        },
        {
          icon: 'block_right',
          value: 'right',
        },
      ],
      locked: true,
    });

    this.addControl("spacing_icon_style", {
      type: CONTROLLER_SLIDER,
      label: "Spacing",
      stateless: true,
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      max: 100,
      min: 0,
      locked: true,
    });

    this.addControl("color_icon_style", {
      type: CONTROLLER_COLOR,
      label: "Color",
    });


    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Tabs;
