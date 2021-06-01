import React, {Component} from 'react'
import {Button, ButtonGroup, Menu, MenuItem, Position} from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import {getMenuByGUID} from "../../../../../front-app/src/js/functions/menus";
import {addMenu} from "../../../../../front-app/src/js/store/menus-storage/actions";
import {getResponsiveSetting, isEditor, mbParseJSON} from "../../../../../front-app/src/js/helpers";
import {createGlobalStyle} from 'styled-components';
import '../../../sass/blueprint.scss'
import {
  dimensionsControllerToStyles, shadowControllerToStyles,
  typographicControllerToStyles
} from "../../../../../front-app/src/js/helpers/styles";

const GlobalStyles = createGlobalStyle`
  ${({elementId, settings}) => {

    let styles = `.bp3-menu-item.altrp-menu-item${elementId}{align-items:center;border-radius:0;`;

    let padding = getResponsiveSetting(settings, 'padding');
    if(padding){
      styles += dimensionsControllerToStyles(padding);
    }

    let typographic = getResponsiveSetting(settings, 'typographic');

    if(typographic){
      styles += typographicControllerToStyles(typographic);
    }

    let bg = getResponsiveSetting(settings, 'bg');


    if(bg && bg.color){
      styles += `background-color: ${bg.color};`;
    }
    let color = getResponsiveSetting(settings, 'color');

    if(color && color.color){
      styles += `color: ${color.color};`;
      styles += `.bp3-icon svg, .bp3-icon path{fill: ${color.color};}`;
    }


    styles += '}';
    /**
     * Hover Styles
     */
    styles += `.bp3-popover-open.bp3-popover-target .bp3-menu-item.altrp-menu-item.altrp-menu-item${elementId},
    .bp3-menu-item.altrp-menu-item.altrp-menu-item${elementId}:hover{`;
    bg = getResponsiveSetting(settings, 'bg', ':hover');
    if(bg && bg.color){
      styles += `background-color: ${bg.color};`;
    }

    typographic = getResponsiveSetting(settings, 'typographic', ':hover');

    if(typographic){
      styles += typographicControllerToStyles(typographic);
    }

    color = getResponsiveSetting(settings, 'color', ':hover');
    if(color && color.color){
      styles += `color: ${color.color};`;
      styles += `.bp3-icon svg, .bp3-icon path{fill: ${color.color};}`;
    }
    styles += '}';

    let gap = getResponsiveSetting(settings, 'gap');
    if(gap){
      styles += `.altrp-portal${elementId} .bp3-menu > li:not(:last-child) { margin-bottom: ${gap}}`;
    }

    /**
     * Submenu styles
     */
    styles += `.altrp-portal${elementId} .bp3-menu{`;

    let sub_menu_padding = getResponsiveSetting(settings, 'sub_menu_padding');
    if(sub_menu_padding){
      styles += dimensionsControllerToStyles(sub_menu_padding);
    }

    let sub_menu_bg = getResponsiveSetting(settings, 'sub_menu_bg');
    if(sub_menu_bg && sub_menu_bg.color){
      styles += `background-color: ${sub_menu_bg.color};`;
    }



    styles += '}';

    styles += `.bp3-portal .altrp-portal.altrp-portal${elementId} .bp3-popover-content{`

    let sub_menu_shadow = getResponsiveSetting(settings, 'sub_menu_shadow');
    if(sub_menu_shadow){
      styles += shadowControllerToStyles(sub_menu_shadow);
    }
    styles += '}';

    styles += `.altrp-portal.altrp-portal${elementId} .bp3-popover-content,
    .altrp-portal.altrp-portal${elementId} .bp3-menu{`;
    let sub_menu_radius = getResponsiveSetting(settings, 'sub_menu_radius');
    if(sub_menu_radius){
      styles += dimensionsControllerToStyles(sub_menu_radius, 'border-radius');
    }
    styles += '}';
    styles += `.altrp-portal${elementId} .bp3-menu:hover{`;

    sub_menu_bg = getResponsiveSetting(settings, 'sub_menu_bg', ':hover');
    if(sub_menu_bg && sub_menu_bg.color){
      styles += `background-color: ${sub_menu_bg.color};`;
    }


    styles += `.bp3-portal .altrp-portal.altrp-portal${elementId} .bp3-popover-content:hover{`

    sub_menu_shadow = getResponsiveSetting(settings, 'sub_menu_shadow', ':hover');
    if(sub_menu_shadow){
      styles += shadowControllerToStyles(sub_menu_shadow);
    }
    styles += '}';
    styles += '}';

    styles += `.altrp-portal.altrp-portal${elementId} .bp3-popover-content:hover,
    .altrp-portal.altrp-portal${elementId} .bp3-menu:hover{`;

    sub_menu_radius = getResponsiveSetting(settings, 'sub_menu_radius', ':hover');
    if(sub_menu_radius){
      styles += dimensionsControllerToStyles(sub_menu_radius, 'border-radius');
    }
    styles += '}';

    return styles;
  }}

  ${({elementId, settings})=>{
    let styles= `.altrp-portal${elementId} .altrp-menu{`;

    const menuPadding = getResponsiveSetting(settings, 'menu_padding');
    if (menuPadding) {
      styles += dimensionsControllerToStyles(menuPadding);
    }
    let menuBg = getResponsiveSetting(settings, 'menu_bg');
    if (menuBg && menuBg.color) {
      styles += `background-color: ${menuBg.color};`;
    }
    let menu_radius = getResponsiveSetting(settings, 'menu_radius');
    if (menu_radius) {
      styles += dimensionsControllerToStyles(menu_radius, 'border-radius');
    }
    let gap = getResponsiveSetting(settings, 'gap');
    if(gap){
      gap = gap.replace(',', '.')
      styles += `& > li:not(:last-child) { margin-${
        getResponsiveSetting(settings, 'type') === 'horizontal' ? 'right' : 'bottom'
      }: ${gap}}`;
    }
    styles += '}';

    /**
     * стили для ховера
     * @type {string}
     */
    styles += `.altrp-portal${elementId} .altrp-menu:hover{`;

    menu_radius = getResponsiveSetting(settings, 'menu_radius', ':hover');
    if (menu_radius) {
      styles += dimensionsControllerToStyles(menu_radius, 'border-radius');
    }

    menuBg = getResponsiveSetting(settings, 'menu_bg', ':hover');
    if (menuBg && menuBg.color) {
      styles += `background-color: ${menuBg.color};`;
    }

    styles += '}';
    let renderButton = getResponsiveSetting(settings, 'button');
    if (renderButton) {
      styles += `.altrp-portal_main.altrp-portal${elementId} .altrp-menu{`;
      let mainPortalWidth = getResponsiveSetting(settings, 'width');
      if(mainPortalWidth){
        styles += `max-width:${mainPortalWidth};width:${mainPortalWidth};`;
      }
      styles += '}';
    }
    return styles;
  }}
  .altrp-menu-item__icon svg {
    display: block;
    height: 20px;
    width: 20px;
  }
`;

class MenuWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};


    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
    this.elementId = props.element.getId();
  }

  getMenuData = async () => {
    let menuGUID = this.props.element.getResponsiveSetting('menu')
    if (this.state.menuData || this.loading || ! menuGUID) {
      return
    }
    this.loading = true;
    const menus = appStore.getState().altrpMenus;
    let menuData = menus.find(menu => menu.guid === menuGUID)
    if (!menuData) {
      menuData = await getMenuByGUID(menuGUID);
      menuData.children = mbParseJSON(menuData.children)
      menuData.settings = mbParseJSON(menuData.settings)
      appStore.dispatch(addMenu(menuData));
    }
    this.setState(state => ({...state, menuData}), () => {
      this.loading = false;
    })
  }

  renderHorizontalMenu() {
    this.getMenuData();
    const {menuData} = this.state;
    if (!menuData) {
      return 'Select Menu';
    }
    return <ButtonGroup fill={true} alignText="left">
      {menuData.children.map(item => {
        return <Button
          minimal={true}
          icon={<span className="altrp-menu-item__icon" dangerouslySetInnerHTML={{__html: item.icon}}/>}
          rightIcon="caret-down"
          text={item.label}
          href={item.url}
          key={item.id}
          onClick={(e) => {
            e.preventDefault();
            if (isEditor() || !this.props.history) {
              return
            }
            this.props.history.push(item.url);
          }}/>
      })}

    </ButtonGroup>
  }

  renderVerticalMenu() {
    this.getMenuData();
    const {menuData} = this.state;
    if (!menuData) {
      return 'Select Menu';
    }
    return <Menu className={this.getMenuClasses()}>
      {/*{menuData.children.map(child)}*/}
      {this.renderSubItems(menuData.children, 1)}
    </Menu>
  }

  /**
   * @return {string}
   */
  getMenuClasses = () => {
    let classes = ['altrp-menu'];

    return classes.join(' ');
  }
  /**
   *
   * @param {[]} items
   * @param {int} depth
   * @return {JSX.Element|null}
   */
  renderSubItems = (items, depth) => {
    if (!items.length) {
      return null;
    }
    const {element} = this.props;
    const popoverProps = {
      usePortal: true,
      // isOpen:true ,
      portalClassName: `altrp-portal altrp-portal${this.elementId}`,
      portalContainer: window.EditorFrame ? window.EditorFrame.contentWindow.document.body : document.body,
    };
    let renderButton = this.props.element.getResponsiveSetting('button');

    if (depth === 1 && element.getResponsiveSetting('type') === 'horizontal' && ! renderButton) {
      popoverProps.position = Position.BOTTOM_LEFT;
    }
    return <>
      {items.map((item) => {
        return <MenuItem
          popoverProps={popoverProps}
          depth={depth}
          href={item.url}
          width={100}
          className={`altrp-menu-item altrp-menu-item${this.elementId}`}
          key={item.id}
          onClick={(e) => {
            e.preventDefault();
            if (isEditor() || !this.props.history) {
              return
            }
            this.props.history.push(item.url);
          }}
          icon={<span className="altrp-menu-item__icon" dangerouslySetInnerHTML={{__html: item.icon}}/>}
          // text={<Link className="altrp-menu-item__link" to={item.url}>{item.label}</Link>}>
          text={item.label}>
          {this.renderSubItems(item.children, depth + 1)}
        </MenuItem>

      })}
    </>
  }



  renderButton = ()=>{
   const {menuData} = this.state;
    if(! menuData){
      return null;
    }
    let toggle_icon = _ .get(menuData, 'settings.toggle_icon', '')
    return <Popover2 content={this.renderVerticalMenu()}
                     className="altrp-popover"
                     portalContainer={ window.EditorFrame ? window.EditorFrame.contentWindow.document.body : document.body}
                     portalClassName={ `altrp-portal altrp-portal_main altrp-portal${this.elementId}`}
                     minimal={true} >
      <Button  text={toggle_icon ?
        <span className="altrp-menu-item__icon" dangerouslySetInnerHTML={{__html: toggle_icon}}/> : ''} />
    </Popover2>
  }

  render() {
    this.getMenuData();
    let type = this.props.element.getResponsiveSetting('type');
    let renderButton = this.props.element.getResponsiveSetting('button');
    if(renderButton){
      return <>
        <GlobalStyles {...this.props} settings={this.props.element.getSettings()} elementId={this.elementId}/>
        {this.renderButton()}
      </>
    }
    switch (type) {
      case 'horizontal': {
        return <>
          <GlobalStyles {...this.props} settings={this.props.element.getSettings()} elementId={this.elementId}/>
          {this.renderVerticalMenu()}
        </>
      }
      default: {
        return <>
          <GlobalStyles {...this.props} settings={this.props.element.getSettings()} elementId={this.elementId}/>
          {this.renderVerticalMenu()}
        </>;
      }
    }
  }
}

export default MenuWidget
