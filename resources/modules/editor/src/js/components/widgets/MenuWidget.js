import React, {Component} from 'react'
import {Button, Menu, MenuDivider, MenuItem,Popover, ButtonGroup } from "@blueprintjs/core";
// import {Popover} from "@blueprintjs/popover2";
import {getMenuByGUID} from "../../../../../front-app/src/js/functions/menus";
import {addMenu} from "../../../../../front-app/src/js/store/menus-storage/actions";
import {isEditor, mbParseJSON} from "../../../../../front-app/src/js/helpers";
import {Link} from "react-router-dom";
import '../../../sass/blueprint.scss'
// import '@blueprintjs/core/src/components/popover/_popover.scss'
import {withRouter} from "react-router";


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

  renderRootMenu() {
    this.getMenuData();
    const {menuData} = this.state;
    if (!menuData) {
      return null;
    }
    return <div className="altrp-menu">
      {menuData.children.map((item) => {
        return <Menu className="altrp-menu-item" key={item.id}>
          {/*<Popover content={<Menu>*/}
          {/*  {this.renderSubItems(item.children)}*/}
          {/*</Menu>}>*/}
          {/*  <Button className="altrp-menu-item__link" to={item.id}>{item.label}</Button>*/}
          {/*</Popover>*/}
          <MenuItem popoverProps={{usePortal:true}}
                    text={item.label}>
            {this.renderSubItems(item.children)}
          </MenuItem>
        </Menu>;

      })}
    </div>
  }

  renderSubItems = (items)=>{
    if(! items.length){
      return null;
    }
    return <>
      {items.map((item)=>{
        return <MenuItem
          popoverProps={{usePortal:true}}
          className=""
          key={item.id}
          icon={<span className="altrp-menu-item__icon" dangerouslySetInnerHTML={{__html: item.icon}}/>}
          // text={<Link className="altrp-menu-item__link" to={item.url}>{item.label}</Link>}>
          text={item.label}>
          {this.renderSubItems(item.children)}
        </MenuItem>

      })}
    </>
  }

  render() {
    return this.renderRootMenu();
  }
}
let exports ;
if(isEditor()){
  exports = MenuWidget;
} else {
  exports = withRouter(MenuWidget)
}
export default withRouter(MenuWidget)
