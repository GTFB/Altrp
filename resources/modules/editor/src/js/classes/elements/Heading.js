import BaseElement from "./BaseElement";
import HeadingIcon from '../../../svgs/widget_heading.svg';

class Heading extends BaseElement{
  static getName(){
    return'heading';
  }
  static getTitle(){
    return'Heading';
  }
  static getIconComponent(){
    return HeadingIcon;
  }
  static getType(){
    return 'widget';
  }
}

export default Heading