import BaseElement from "./BaseElement";
import WidgetIcon from '../../../svgs/widget_gallery.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_LINK,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_REPEATER,
  CONTROLLER_CHOOSE,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  CONTROLLER_SHADOW,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED, CONTROLLER_MEDIA
} from "../modules/ControllersManager";
import Repeater from "../Repeater";

class Carousel extends BaseElement{

  static getName(){
    return'carousel';
  }
  static getTitle(){
    return'Carousel';
  }

  static getIconComponent(){
    return WidgetIcon;
  }
  static getType(){
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('slides_content', {
      tab: TAB_CONTENT,
      label: 'Slides',
    });

    this.addControl('slin_slides_content', {
      type: CONTROLLER_SELECT,
      label: 'Skin',
      default: 'solid',
      options: [
        {
          value: 'carousel',
          label: 'carousel'
        },
        {
          value: 'coverflow',
          label: 'coverflow'
        },
      ]
    });

    let repeater = new Repeater();

    repeater.addControl('image_slides_repeater', {
      type: CONTROLLER_MEDIA,
      label: 'image',
    });

    repeater.addControl('link_to_slides_repeater', {
      type: CONTROLLER_SELECT,
      label: 'Link to',
      default: 'none',
      options: [
        {
          value: 'none',
          label: 'none'
        },
        {
          value: 'mediaFile',
          label: 'media file'
        },
        {
          value: 'customURL',
          label: 'custom URL'
        },
      ]
    });

    repeater.addControl('custom_url_slides_repeater', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: 'link',
    });

    this.addControl('slides_repeater', {
      label: 'Tab Items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
      default: [
      ]
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Carousel
