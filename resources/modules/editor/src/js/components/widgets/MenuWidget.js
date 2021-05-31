import React, {Component} from 'react'
import {Button, ButtonGroup, Menu, MenuItem, Position} from "@blueprintjs/core";
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

    console.log(styles);

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
    if (this.state.menuData || this.loading) {
      return
    }
    this.loading = true;
    const menus = appStore.getState().altrpMenus;
    let menuGUID = this.props.element.getResponsiveSetting('menu')
    let menuData = menus.find(menu => menu.guid === menuGUID)
    if (!menuData) {
      menuData = await getMenuByGUID(menuGUID);
      menuData.children = mbParseJSON(menuData.children)
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
      return null;
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
      return null;
    }
    return <Menu className={this.getMenuClasses()}>
      <GlobalStyles {...this.props} settings={this.props.element.getSettings()} elementId={this.elementId}/>
      {/*{menuData.children.map(child)}*/}
      {this.renderSubItems(menuData.children, 1)}
    </Menu>
  }

  /**
   * @return {string}
   */
  getMenuClasses = () => {
    let classes = ['altrp-menu'];

    const {element} = this.props;

    // if(element.getResponsiveSetting('type') === 'horizontal'){
    //   classes.push('bp3-horizontal');
    // }
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
    if (depth === 1 && element.getResponsiveSetting('type') === 'horizontal') {
      // popoverProps.placement = Position.BOTTOM_LEFT;
      popoverProps.position = Position.BOTTOM_LEFT;
      // popoverProps.fill = true;
      // popoverProps.targetTagName = 'div';
      // popoverProps.modifiers =  {
      //   computeStyle: {
      //     fn: (...props)=>{
      //       console.log(props);
      //       return props[0];
      //     }
      //
      //   }
      // };
      // popoverProps.onInteraction = function (nextOpenState, e){
      //   if(nextOpenState){
      //     console.log(e.target);
      //   }
      // };
      // console.log(popoverProps);

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

  render() {
    let type = this.props.element.getResponsiveSetting('type')
    switch (type) {
      case 'horizontal': {
        return this.renderVerticalMenu()
      }
      default: {
        return this.renderVerticalMenu();
      }
    }
  }
}

export default MenuWidget
