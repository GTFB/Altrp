import BaseElement from "./BaseElement";
import widgetIcon from '../../../svgs/tabs.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_CHOOSE,
  CONTROLLER_TEXT,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  CONTROLLER_REPEATER,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED,
  CONTROLLER_MEDIA,
  CONTROLLER_SWITCHER,
  CONTROLLER_LINK, CONTROLLER_WYSIWYG, CONTROLLER_HEADING
} from "../modules/ControllersManager";
import Repeater from "../Repeater";

class TabsSwitcher extends BaseElement{

  static getName(){
    return'tabs-switcher';
  }
  static getTitle(){
    return'Tabs switcher';
  }

  static getIconComponent(){
    return widgetIcon;
  }
  static getType(){
    return 'widget';
  }

  static getGroup() {
    return "Basic";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('section_one', {
      tab: TAB_CONTENT,
      label: 'Section 1',
    });

    this.addControl("one_title", {
      type: CONTROLLER_TEXT,
      label: 'Title',
      default: 'section 1'
    });

    this.addControl("one_type", {
      type: CONTROLLER_SELECT,
      label: "Type",
      default: "text",
      options: [
        {
          value: "text",
          label: "Text editor"
        },
        {
          value: "template",
          label: "Template"
        },
      ],
    });

    this.addControl("one_wysiwyg", {
      type: CONTROLLER_WYSIWYG,
      label: "Text editor",
      conditions: {
        'one_type': 'text',
      },
    });

    this.addControl("one_template", {
      conditions: {
        'one_type': "template",
      },
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

    this.endControlSection();

    this.startControlSection('section_two', {
      tab: TAB_CONTENT,
      label: 'Section 2',
    });

    this.addControl("two_title", {
      type: CONTROLLER_TEXT,
      label: 'Title',
      default: 'section 2'
    });

    this.addControl("two_type", {
      type: CONTROLLER_SELECT,
      label: "Type",
      default: "text",
      options: [
        {
          value: "text",
          label: "Text editor"
        },
        {
          value: "template",
          label: "Template"
        },
      ],
    });

    this.addControl("two_wysiwyg", {
      type: CONTROLLER_WYSIWYG,
      label: "Text editor",
      conditions: {
        'two_type': 'text',
      },
    });

    this.addControl("two_template", {
      conditions: {
        'two_type': "template",
      },
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

    this.endControlSection();

    this.startControlSection("switch_button", {
      tab: TAB_STYLE,
      label: "Switch button"
    });

    this.addControl("box_around_color_one", {
      type: CONTROLLER_COLOR,
      label: "Box around color 1",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl("box_around_color_two", {
      type: CONTROLLER_COLOR,
      label: "Box around color 2",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl("switch_color", {
      type: CONTROLLER_COLOR,
      label: "Switch color",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl('size', {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      min: 0,
      max: 100,
    });

    this.addControl('spacing', {
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      min: 0,
      max: 100,
    });

    this.addControl('margin_bottom', {
      type: CONTROLLER_SLIDER,
      label: 'Margin bottom',
      min: 0,
      max: 100,
    });

    this.addControl("box_border_radius", {
      type: CONTROLLER_SLIDER,
      label: "Box around border radius",
      units: [
        'px',
        '%',
      ],
      max: 100,
      min: 0,
    });

    this.addControl("switch_border_radius", {
      type: CONTROLLER_SLIDER,
      label: "Switch border radius",
      units: [
        'px',
        '%',
      ],
      max: 100,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection("title", {
      tab: TAB_STYLE,
      label: "Title"
    });

    this.addControl('heading_title_one', {
      type: CONTROLLER_HEADING,
      label: 'Title 1',
    });

    this.addControl('typographic_title_one', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('color_title_one', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    });

    this.addControl('heading_title_two', {
      type: CONTROLLER_HEADING,
      label: 'Title 2',
    });

    this.addControl('typographic_title_two', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('color_title_two', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    });

    this.endControlSection();

    this.startControlSection("content", {
      tab: TAB_STYLE,
      label: "Content"
    });

    this.addControl('heading_section_one', {
      type: CONTROLLER_HEADING,
      label: 'Section 1',
    });

    this.addControl('typographic_section_one', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('color_section_one', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    });

    this.addControl('heading_section_two', {
      type: CONTROLLER_HEADING,
      label: 'Section 2',
    });

    this.addControl('typographic_section_two', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('color_section_two', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default TabsSwitcher
