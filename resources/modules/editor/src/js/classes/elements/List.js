import BaseElement from "./BaseElement";
import widgetIcon from '../../../svgs/bullet-list.svg';
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
  CONTROLLER_LINK
} from "../modules/ControllersManager";
import Repeater from "../Repeater";

class List extends BaseElement{

  static getName(){
    return'list';
  }
  static getTitle(){
    return'List';
  }

  static getIconComponent(){
    return widgetIcon;
  }
  static getType(){
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('meta_data_section', {
      tab: TAB_CONTENT,
      label: 'Meta data',
    });

    this.addControl('layout_meta_data', {
      type: CONTROLLER_CHOOSE,
      label: 'Layout',
      default: 'default',
      options:[
        {
          icon: 'left',
          value: 'default',
        },
        {
          icon: 'in_width',
          value: 'inline',
        },
      ],
    });

    let repeater = new Repeater();

    repeater.addControl("type_repeater", {
      type: CONTROLLER_SELECT,
      label: "Type",
      options: [
        {
          value: "author",
          label: "author"
        },
        {
          value: "date",
          label: "date"
        },
        {
          value: "time",
          label: "time"
        },
        {
          value: "comments",
          label: "comments"
        },
        {
          value: "terms",
          label: "terms"
        },
        {
          value: "custom",
          label: "custom"
        }
      ],
    });

    repeater.addControl('custom_repeater', {
      type: CONTROLLER_TEXT,
      label: 'Custom',
    });

    repeater.addControl('link_switcher_custom_repeater', {
      type: CONTROLLER_SWITCHER,
      label: 'Link',
    });

    repeater.addControl('hover_all_switcher_custom_repeater', {
      type: CONTROLLER_SWITCHER,
      label: 'Hover all',
    });

    repeater.addControl('link_custom_repeater', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        openInNew: false,
        noFollow: true
      },
      label: 'link',
    });

    repeater.addControl("icon_select_repeater", {
      type: CONTROLLER_SELECT,
      label: "Icon",
      options: [
        {
          value: "none",
          label: "none"
        },
        {
          value: "custom",
          label: "custom"
        },
      ],
    });

    repeater.addControl('icon_repeater', {
      type: CONTROLLER_MEDIA,
      label: 'Choose icon',
    });

    repeater.addControl('vertical_alignment_icon_repeater', {
      type: CONTROLLER_CHOOSE,
      label: 'Vertical alignment',
      options:[
        {
          icon: 'left',
          value: 'top',
        },
        {
          icon: 'center',
          value: 'center',
        },
        {
          icon: 'right',
          value: 'bottom',
        }
      ],
    });

    repeater.addControl('position_relative_switcher_custom_repeater', {
      type: CONTROLLER_SWITCHER,
      label: 'Position relative',
    });

    repeater.addControl("position_relative_x_custom_repeater", {
      type: CONTROLLER_SLIDER,
      label: "Position X",
      units:[
        'px',
        '%',
      ],
      max: 100,
      min: 0,
    });

    repeater.addControl("position_relative_y_custom_repeater", {
      type: CONTROLLER_SLIDER,
      label: "Position Y",
      units:[
        'px',
        '%',
      ],
      max: 100,
      min: 0,
    });

    this.addControl('repeater_meta_data_section', {
      label: 'List items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
      default: []
    });


    this.endControlSection();

    this.startControlSection('position_section', {
      tab: TAB_STYLE,
      label: 'Position',
    });

    this.addControl('position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      // default: {
      //   top: 10,
      //   right: 10,
      //   bottom: 10,
      //   left: 10,
      //   unit: 'px',
      //   bind: true
      // },
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      // default: {
      //   top: 20,
      //   right: 25,
      //   bottom: 20,
      //   left: 25,
      //   unit: 'px',
      //   bind: true
      // },
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl('position_z_index', {
      type: CONTROLLER_NUMBER,
      label: 'Z-index',
    });

    this.addControl('position_css_id', {
      type: CONTROLLER_TEXT,
      label: 'CSS ID'
    });

    this.addControl('position_css_classes', {
      type: CONTROLLER_TEXT,
      label: 'CSS Classes',
    });

    this.endControlSection();

    this.startControlSection('list_style', {
      tab: TAB_STYLE,
      label: 'List',
    });

    this.addControl("space_between_list_style", {
      type: CONTROLLER_SLIDER,
      label: 'Space between',
      default:{
        size: 10,
        unit: 'px',
      },
      max: 50,
      min: 0,
    });

    this.addControl('alignment_list_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
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
        }
      ],
    });

    this.addControl('divider_switcher_list_style', {
      type: CONTROLLER_SWITCHER,
      label: 'Divider',
    });

    this.addControl('divider_style_list_style', {
      // conditions: {
      //   'divider_switcher_list_style': true,
      // },
      type: CONTROLLER_SELECT,
      label: 'Style',
      options: [
        {
          value: 'solid',
          label: 'solid'
        },
        {
          value: 'double',
          label: 'double'
        },
        {
          value: 'dotted',
          label: 'dotted'
        },
        {
          value: 'dashed',
          label: 'dashed'
        }
      ],
      conditions: {
        'divider_switcher_list_style': true,
      },
    });

    this.addControl('divider_weight_list_style', {
      // conditions: {
      //   'divider_switcher_list_style': true,
      // },
      type: CONTROLLER_SLIDER,
      label: 'Weight',
      default:{
        unit: 'px',
      },
      max: 20,
      min: 0,
      conditions: {
        'divider_switcher_list_style': true,
      },
    });

    this.addControl('divider_color_list_style', {
        // conditions: {
        //   'divider_switcher_list_style': true,
        // },
        type: CONTROLLER_COLOR,
        label: 'Color',
        default: {
          color: "",
          colorPickedHex: "",
        },
        conditions: {
          'divider_switcher_list_style': true,
        },
      }
    );

    this.addControl('divider_width_list_style', {
      // conditions: {
      //   'divider_switcher_list_style': true,
      // },
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default:{
        unit: '%',
      },
      units:[
        'px',
        '%',
      ],
      max: 100,
      min: 0,
      conditions: {
        'divider_switcher_list_style': true,
      },
    });

    this.endControlSection();

    this.startControlSection('icon_style', {
      tab: TAB_STYLE,
      label: 'Icon',
    });

    this.addControl('size_icon_style', {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      default:{
        unit: 'px',
      },
      max: 100,
      min: 0,
    });

    this.addControl("fill_icon_style", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl("background_icon_style", {
      type: CONTROLLER_COLOR,
      label: "Background Color",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl('padding_icon_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default:{
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl("border-type_icon_style", {
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

    this.addControl("border-width_icon_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
    });

    this.addControl("border_color_icon_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
    });

    this.addControl('border-radius_icon_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      default:{
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
    });

    this.endControlSection();

    this.startControlSection('text_style', {
      tab: TAB_STYLE,
      label: 'Text',
    });

    this.addControl("indent_text_style", {
      type: CONTROLLER_SLIDER,
      label: 'Indent',
      default:{
        // size: 0,
        unit: 'px',
      },
      max: 50,
      min: 0,
    });

    this.addControl("color_text_style", {
      type: CONTROLLER_COLOR,
      label: "Text color",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl("background_color_text_style", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl('padding_text_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      // default:{
      //   top: 0,
      //   right: 0,
      //   bottom: 0,
      //   left: 0,
      //   unit:'px'
      // },
      units:[
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl("border-type_text_style", {
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

    this.addControl("border-width_text_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
    });

    this.addControl("border_color_text_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
    });

    this.addControl('border-radius_text_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      default:{
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
    });


    this.addControl('typographic_text_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        // default:{
        //   lineHeight: 1,
        //   spacing: 0,
        //   size: 16,
        //   weight: "normal",
        //   family: "Open Sans",
        //   decoration: ""
        // },
      }
    );

    this.addControl("link_decoration_text_style", {
      type: CONTROLLER_SELECT,
      label: "Text decoration",
      // default: "none",
      options: [
        {
          value: "none",
          label: "none"
        },
        {
          value: "underline",
          label: "underline"
        },
        {
          value: "overline",
          label: "overline"
        },
        {
          value: "line-through",
          label: "line-through"
        },
      ],
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default List
