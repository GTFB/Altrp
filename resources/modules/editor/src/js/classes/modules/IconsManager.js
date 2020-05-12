import Icon from "../Icon";
import AddIcon from '../../../svgs/add.svg';
import AdvancedIcon from '../../../svgs/advanced.svg';

class IconsManager {
  constructor(){
    this.icons = [];
    this.icons.push(new Icon('add', AddIcon));
    this.icons.push(new Icon('advanced', AdvancedIcon));
    this.icons.push(new Icon('default', AddIcon));
  }
  /**
   * @param {string} iconName
   * @return {function}
   * @throws
   * */
  getIconComponent(iconName){
    let iconComponent;
    this.icons.forEach(icon=>{
      if(icon.name === iconName){
        iconComponent = icon.iconComponent;
      }
    });
    if(! iconComponent){
      console.error( `Icon ${iconName} not found`);
    }
    return iconComponent;
  }
  /**
   * @param {string} iconName
   * @return {Icon}
   * @throws
   * */
  getIcon(iconName){
    let _icon;
    this.icons.forEach(icon=>{
      if(icon.name === iconName){
        _icon = icon;
      }
    });
    if(! _icon){
      throw `Icon ${iconName} not found`;
    }
    return _icon;
  }
  /**
   * @return {array}
   * */
  getIconsList(){
    return this.icons;
  }
  /**
   * @param {string} iconName
   * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
   * @throws
   * */
  renderIcon(iconName){
    let iconComponent = this.getIconComponent(iconName);
    if(! iconComponent) {
      iconComponent = this.getIconComponent('default');
    }
    return React.createElement(iconComponent);
  }
}

export default IconsManager