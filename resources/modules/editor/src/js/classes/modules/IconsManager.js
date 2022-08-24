import Icon from "../Icon";
import AddIcon from '../../../svgs/add.svg';
import AdvancedIcon from '../../../svgs/advanced.svg';
import ArrowIcon from '../../../svgs/arrow.svg';
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
import deleteIconOne from '../../../svgs/delete_variant_1.svg';
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
import minusIcon from '../../../svgs/minus.svg';
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
import triggersTab from '../../../svgs/triggers_tab.svg'
import advancedTab from '../../../svgs/timing_tab.svg'
import pageLoad from '../../../svgs/page_load.svg'
import scrollingIcon from '../../../svgs/scrolling.svg'
import scrollingTo from '../../../svgs/scrolling_to.svg'
import clickIcon from '../../../svgs/click.svg'
import inactivityIcon from '../../../svgs/inactivity.svg'
import exitIntent from '../../../svgs/exit_intent.svg'
import exit from '../../../svgs/exit.svg'
import starIcon from '../../../svgs/widget_icon.svg'
import check from '../../../svgs/check.svg'

import s1 from '../../../svgs/1H34NbWILW0tD8tr4snZXkDpw5B8IM9jFr2GUWxP.svg'
import s2 from '../../../svgs/arrow-left 1.svg'
import s3 from '../../../svgs/Frame 2.svg'
import s4 from '../../../svgs/Frame 3.svg'
import s5 from '../../../svgs/Union.svg'
import s6 from '../../../svgs/Vector (1).svg'
import s7 from '../../../svgs/Vector (2).svg'
import s8 from '../../../svgs/Vector1.svg'
import s9 from '../../../svgs/zgIUZOgUUYp3ZSLdeFaAS8Fbt6oHuqDW22YXArRO.svg'

import avi from '../../../svgs/AVI.svg'
import doc from '../../../svgs/DOC.svg'
import docx from '../../../svgs/DOCX.svg'
import eot from '../../../svgs/EOT.svg'
import file from '../../../svgs/FILE.svg'
import gif from '../../../svgs/GIF.svg'
import jpeg from '../../../svgs/JPEG.svg'
import jpg from '../../../svgs/JPG.svg'
import mp3 from '../../../svgs/MP3.svg'
import mp4 from '../../../svgs/MP4.svg'
import odp from '../../../svgs/ODP.svg'
import ods from '../../../svgs/ODS.svg'
import odt from '../../../svgs/ODT.svg'
import otf from '../../../svgs/OTF.svg'
import pdf from '../../../svgs/PDF.svg'
import png from '../../../svgs/PNG.svg'
import ppt from '../../../svgs/PPT.svg'
import pptx from '../../../svgs/PPTX.svg'
import rar from '../../../svgs/RAR.svg'
import svg from '../../../svgs/SVG.svg'
import ttf from '../../../svgs/TTF.svg'
import wav from '../../../svgs/WAV.svg'
import webm from '../../../svgs/WEBM.svg'
import webp from '../../../svgs/WEBP.svg'
import woff from '../../../svgs/WOFF.svg'
import woff2 from '../../../svgs/WOFF2.svg'
import xls from '../../../svgs/XLS.svg'
import xlsx from '../../../svgs/XLSX.svg'
import zip from '../../../svgs/ZIP.svg'

import adminBar1 from '../../../svgs/admin-bar1.svg';
import adminBar2 from '../../../svgs/admin-bar2.svg';
import adminBar3 from '../../../svgs/admin-bar3.svg';
import adminBar4 from '../../../svgs/admin-bar4.svg';
import copyIcon from '../../../svgs/copy-icon.svg';
import chevronAdminBar from '../../../svgs/chevron-admin-bar.svg';
import adminNewBar from '../../../svgs/admin-bar-new.svg';
import adminSettingsBar from '../../../svgs/admin-page-settings.svg';
import K2 from '../../../svgs/2K+.svg';
class IconsManager {
  constructor() {
    this.icons = [];
    this.icons.push(new Icon('add', AddIcon));
    this.icons.push(new Icon('advanced', AdvancedIcon));
    this.icons.push(new Icon('arrow', ArrowIcon));
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
    this.icons.push(new Icon('deleteOne', deleteIconOne));
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
    this.icons.push(new Icon('minus', minusIcon));
    this.icons.push(new Icon('preview', previewIcon));
    this.icons.push(new Icon('settings', settingsIcon));
    this.icons.push(new Icon('style', styleIcon));
    this.icons.push(new Icon('block_bottom', blockBottomIcon));
    this.icons.push(new Icon('block_horiz', blockHorizontallyIcon));
    this.icons.push(new Icon('block_left', blockLeftIcon));
    this.icons.push(new Icon('block_top', blockTopIcon));
    this.icons.push(new Icon('block_right', blockRightIcon));
    this.icons.push(new Icon('block_vertically', blockVerticallyIcon));
    this.icons.push(new Icon('block_d_horiz', blockDHorizontallyIcon));
    this.icons.push(new Icon('block_d_vertic', blockDVerticallyIcon));
    this.icons.push(new Icon('wide_screen', widescreenIcon));
    this.icons.push(new Icon('laptop', laptopIcon));
    this.icons.push(new Icon('tablet', tabletIcon));
    this.icons.push(new Icon('big_phone', bigPhoneIcon));
    this.icons.push(new Icon('small_phone', smallPhoneIcon));
    this.icons.push(new Icon('conditions_tab', conditionsTab));
    this.icons.push(new Icon('triggers_tab', triggersTab));
    this.icons.push(new Icon('advanced_tab', advancedTab));
    this.icons.push(new Icon('page_load', pageLoad));
    this.icons.push(new Icon('scrolling', scrollingIcon));
    this.icons.push(new Icon('scrolling_to', scrollingTo));
    this.icons.push(new Icon('click', clickIcon));
    this.icons.push(new Icon('inactivity', inactivityIcon));
    this.icons.push(new Icon('exit_intent', exitIntent));
    this.icons.push(new Icon('exit', exit));
    this.icons.push(new Icon('star', starIcon));

    this.icons.push(new Icon('s1', s1));
    this.icons.push(new Icon('s2', s2));
    this.icons.push(new Icon('s3', s3));
    this.icons.push(new Icon('s4', s4));
    this.icons.push(new Icon('s5', s5));
    this.icons.push(new Icon('s6', s6));
    this.icons.push(new Icon('s7', s7));
    this.icons.push(new Icon('s8', s8));
    this.icons.push(new Icon('s9', s9));

    this.icons.push(new Icon('avi', avi));
    this.icons.push(new Icon('doc', doc));
    this.icons.push(new Icon('docx', docx));
    this.icons.push(new Icon('eot', eot));
    this.icons.push(new Icon('file', file));
    this.icons.push(new Icon('gif', gif));
    this.icons.push(new Icon('jpeg', jpeg));
    this.icons.push(new Icon('jpg', jpg));
    this.icons.push(new Icon('mp3', mp3));
    this.icons.push(new Icon('mp4', mp4));
    this.icons.push(new Icon('odp', odp));
    this.icons.push(new Icon('ods', ods));
    this.icons.push(new Icon('odt', odt));
    this.icons.push(new Icon('otf', otf));
    this.icons.push(new Icon('pdf', pdf));
    this.icons.push(new Icon('png', png));
    this.icons.push(new Icon('ppt', ppt));
    this.icons.push(new Icon('pptx', pptx));
    this.icons.push(new Icon('rar', rar));
    this.icons.push(new Icon('svg', svg));
    this.icons.push(new Icon('ttf', ttf));
    this.icons.push(new Icon('wav', wav));
    this.icons.push(new Icon('webm', webm));
    this.icons.push(new Icon('webp', webp));
    this.icons.push(new Icon('woff', woff));
    this.icons.push(new Icon('woff2', woff2));
    this.icons.push(new Icon('xls', xls));
    this.icons.push(new Icon('xlsx', xlsx));
    this.icons.push(new Icon('zip', zip));
    this.icons.push(new Icon('check', check));

    this.icons.push(new Icon('admin-bar1', adminBar1));
    this.icons.push(new Icon('admin-bar2', adminBar2));
    this.icons.push(new Icon('admin-bar3', adminBar3));
    this.icons.push(new Icon('admin-bar4', adminBar4));
    this.icons.push(new Icon('copy-icon', copyIcon));
    this.icons.push(new Icon('chevron-admin-bar', chevronAdminBar));
    this.icons.push(new Icon('admin-new-bar', adminSettingsBar));
    this.icons.push(new Icon('admin-settings-bar', adminNewBar));
    this.icons.push(new Icon('2K+', K2));
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
