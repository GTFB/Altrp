import Icon from "../Icon";
import AddIcon from '../../../svgs/add.svg';
import AdvancedIcon from '../../../svgs/advanced.svg';
import UploadIcon from '../../../svgs/upload.svg';

class IconsManager {
  constructor(){
    this.icons = [];
    this.icons.push(new Icon('add', AddIcon));
    this.icons.push(new Icon('advanced', AdvancedIcon));
    this.icons.push(new Icon('default', AddIcon));
    this.icons.push(new Icon('upload', UploadIcon));
  }
  /**
   * @param {string} iconName
   * @return {function}
   * @throws
   * */
  getIconComponent(iconName){
    let icon = this.getIcon(iconName);
    return icon.iconComponent;
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
   * @param {object} props || null
   * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
   * @throws
   * */
  renderIcon(iconName, props){
    let iconComponent = this.getIconComponent(iconName);
    if(! iconComponent) {
      iconComponent = this.getIconComponent('default');
    }
    return React.createElement(iconComponent, props);
  }
}

export default IconsManager