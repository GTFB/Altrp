import Icon from "../Icon";
import AddIcon from '../../../svgs/add.svg';
import AdvancedIcon from '../../../svgs/advanced.svg';
import UploadIcon from '../../../svgs/upload.svg';
import TimesIcon from '../../../svgs/times.svg';
import LeftIcon from '../../../svgs/left.svg';
import CenterIcon from '../../../svgs/center.svg';
import RightIcon from '../../../svgs/right.svg';
import InWidthIcon from '../../../svgs/in_width.svg';
import bindIcon from '../../../svgs/bind.svg';
import buttonIcon from '../../../svgs/button.svg';
import chevronIcon from '../../../svgs/chevron.svg';
import columnsIcon from '../../../svgs/columns.svg';
import contentIcon from '../../../svgs/content.svg';
import deleteIcon from '../../../svgs/delete.svg';
import desktopIcon from '../../../svgs/desktop.svg';
import desktopNewIcon from '../../../svgs/desktopNew.svg';
import dotsSectionIcon from '../../../svgs/dots_section.svg';
import dotsIcon from '../../../svgs/dots.svg';
import duplicateIcon from '../../../svgs/duplicate.svg';
import dynamicIcon from '../../../svgs/dynamic.svg';
import editIcon from '../../../svgs/edit.svg';
import folderIcon from '../../../svgs/folder.svg';
import formIcon from '../../../svgs/form.svg';
import hamburgerIcon from '../../../svgs/hamburger.svg';
import historyIcon from '../../../svgs/history.svg';
import imageIcon from '../../../svgs/image.svg';
import logoIcon from '../../../svgs/logo.svg';
import navigationIcon from '../../../svgs/navigation.svg';
import plusIcon from '../../../svgs/plus.svg';
import previewIcon from '../../../svgs/preview.svg';
import settingsIcon from '../../../svgs/settings.svg';
import styleIcon from '../../../svgs/style.svg';
import blockBottomIcon from '../../../svgs/block_align_bottom.svg';
import blockHorizontallyIcon from '../../../svgs/block_align_horizontally.svg';
import blockLeftIcon from '../../../svgs/block_align_left.svg';
import blockRightIcon from '../../../svgs/block_align_right.svg';
import blockTopIcon from '../../../svgs/block_align_top.svg';
import blockVerticallyIcon from '../../../svgs/block_align_vertically.svg';
import blockDHorizontallyIcon from '../../../svgs/block_distribute_horizontally.svg';
import blockDVerticallyIcon from '../../../svgs/block_distribute_vertically.svg';
import widescreenIcon from '../../../svgs/widescreen.svg'
import laptopIcon from '../../../svgs/laptop.svg'
import tabletIcon from '../../../svgs/tablet.svg'
import bigPhoneIcon from '../../../svgs/bigphonescreen.svg'
import smallPhoneIcon from '../../../svgs/smallphonescreen.svg'
import conditionsTab from '../../../svgs/conditions-tab.svg'

class IconsManager {
  constructor() {
    this.icons = [];
    this.icons.push(new Icon('add', AddIcon));
    this.icons.push(new Icon('advanced', AdvancedIcon));
    this.icons.push(new Icon('default', AddIcon));
    this.icons.push(new Icon('upload', UploadIcon));
    this.icons.push(new Icon('times', TimesIcon));
    this.icons.push(new Icon('close', TimesIcon));
    this.icons.push(new Icon('left', LeftIcon));
    this.icons.push(new Icon('center', CenterIcon));
    this.icons.push(new Icon('right', RightIcon));
    this.icons.push(new Icon('in_width', InWidthIcon));
    this.icons.push(new Icon('bind', bindIcon));
    this.icons.push(new Icon('button', buttonIcon));
    this.icons.push(new Icon('chevron', chevronIcon));
    this.icons.push(new Icon('columns', columnsIcon));
    this.icons.push(new Icon('content', contentIcon));
    this.icons.push(new Icon('delete', deleteIcon));
    this.icons.push(new Icon('desktop', desktopIcon));
    this.icons.push(new Icon('desktopNew', desktopNewIcon));
    this.icons.push(new Icon('dots_section', dotsSectionIcon));
    this.icons.push(new Icon('dots', dotsIcon));
    this.icons.push(new Icon('duplicate', duplicateIcon));
    this.icons.push(new Icon('dynamic', dynamicIcon));
    this.icons.push(new Icon('edit', editIcon));
    this.icons.push(new Icon('folder', folderIcon));
    this.icons.push(new Icon('form', formIcon));
    this.icons.push(new Icon('hamburger', hamburgerIcon));
    this.icons.push(new Icon('history', historyIcon));
    this.icons.push(new Icon('image', imageIcon));
    this.icons.push(new Icon('logo', logoIcon));
    this.icons.push(new Icon('navigation', navigationIcon));
    this.icons.push(new Icon('plus', plusIcon));
    this.icons.push(new Icon('preview', previewIcon));
    this.icons.push(new Icon('settings', settingsIcon));
    this.icons.push(new Icon('style', styleIcon));
    this.icons.push(new Icon('block_bottom', blockBottomIcon));
    this.icons.push(new Icon('block_horiz', blockHorizontallyIcon));
    this.icons.push(new Icon('block_left', blockLeftIcon));
    this.icons.push(new Icon('block_top', blockTopIcon));
    this.icons.push(new Icon('block_right', blockRightIcon));
    this.icons.push(new Icon('block_veric', blockVerticallyIcon));
    this.icons.push(new Icon('block_d_horiz', blockDHorizontallyIcon));
    this.icons.push(new Icon('block_d_vertic', blockDVerticallyIcon));
    this.icons.push(new Icon('wide_screen', widescreenIcon))
    this.icons.push(new Icon('laptop', laptopIcon))
    this.icons.push(new Icon('tablet', tabletIcon))
    this.icons.push(new Icon('big_phone', bigPhoneIcon))
    this.icons.push(new Icon('small_phone', smallPhoneIcon))
    this.icons.push(new Icon('conditions_tab', conditionsTab))
  }
  /**
   * @param {string} iconName
   * @return {function}
   * @throws Исключение если иконка не найдена
   * */
  getIconComponent(iconName) {
    let icon = this.getIcon(iconName);
    return icon.iconComponent;
  }
  /**
   * @param {string} iconName
   * @return {Icon}
   * @throws Исключение если иконка не найдена
   * */
  getIcon(iconName) {
    let _icon;
    this.icons.forEach(icon => {
      if (icon.name === iconName) {
        _icon = icon;
      }
    });
    if (!_icon) {
      throw `Icon ${iconName} not found`;
    }
    return _icon;
  }
  /**
   * @return {array}
   * */
  getIconsList() {
    return this.icons;
  }
  /**
   * @param {string} iconName
   * @param {object} props
   * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
   * @throws Исключение если иконка не найдена
   * */
  renderIcon(iconName, props = null) {
    let iconComponent = this.getIconComponent(iconName);
    if (!iconComponent) {
      iconComponent = this.getIconComponent('default');
    }
    return React.createElement(iconComponent, props);
  }
}

export default IconsManager