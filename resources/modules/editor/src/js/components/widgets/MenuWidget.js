import {getMenuByGUID} from "../../../../../front-app/src/js/functions/menus";
import {addMenu} from "../../../../../front-app/src/js/store/menus-storage/actions";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import conditionChecker from "../../../../../front-app/src/js/functions/conditionChecker";
import mbParseJSON from "../../../../../front-app/src/js/functions/mb-parse-JSON";


import {Button,  Menu, MenuItem, Position} from '@blueprintjs/core'
import {Popover2} from '@blueprintjs/popover2'
import defaultBurgerMenuIcon from "./misc/defaultBurgerMenuIcon";



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
    this.element = props.element;
  }

  getSelector(){

    if(this.element.settings.global_styles_presets){
      return `_altrp-preset_${this.element.getName()}-${this.element.settings.global_styles_presets}`
    }
    return this.element.id
  }
  getMenuData = async () => {
    let menuGUID = this.props.element.getResponsiveLockedSetting('menu')
    if ((this.state.menuData || !menuGUID) && this.menuGUID === menuGUID ) {
      return
    }

    this.loading = true;
    const menus = appStore.getState().altrpMenus;
    let menuData = menus.find(menu => menu.guid === menuGUID)
    if (!menuData) {
      menuData = await getMenuByGUID(menuGUID);
      if(menuData) {
        menuData.children = mbParseJSON(menuData.children)
        menuData.settings = mbParseJSON(menuData.settings)
        appStore.dispatch(addMenu(menuData));

      }
    }
    this.menuData = menuData
    this.menuGUID = menuGUID
    await window.altrpHelpers.delay(100)
    this.setState(state=>({...state, menuData}))
  }

  renderVerticalMenu() {
    this.getMenuData();
    const {menuData} = this;
    if (!menuData) {
      return 'Select Menu';
    }

    return <Menu className={this.getMenuClasses()}>
      {/*{menuData.children.map(child)}*/}
      {this.renderSubItems(menuData.children, 1)}
    </Menu>
  }


  /**
   * Получить css классы для menu widget
   */
  getClasses = ()=>{
    let classes = ``;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  /**
   * @return {string}
   */
  getMenuClasses = () => {
    let classes = ['altrp-menu']
    if(this.isActive()){
      classes.push('active')
    }
    if(this.isDisabled()){
      classes.push('state-disabled')
    }

    let type = this.props.element.getResponsiveLockedSetting('type') || 'vertical';

    classes.push(`altrp-menu_${type}`)

    return classes.join(' ');
  }
  /**
   *
   * @param {[]} items
   * @param {int} depth
   * @param {string} parentId
   * @return {JSX.Element|null}
   */
  renderSubItems = (items, depth, parentId = null) => {
    if (!items.length) {
      return null;
    }
    const {element} = this.props;
    let classes =
      this.getClasses() + (element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    const popoverProps = {
      usePortal: true,
      //isOpen:true ,
      portalClassName: `${classes} altrp-portal altrp-portal${this.getSelector()} `,
      portalContainer: window.EditorFrame ? window.EditorFrame.contentWindow.document.body : document.body,
    };
    let itemClasses = ''
    if(depth === 1) {
      const positionSetting = this.props.element.getResponsiveLockedSetting('popover_position', "", "auto");

      popoverProps.position = this.getPosition(positionSetting)

      popoverProps.portalClassName += " altrp-menu-first-portal"
    } else {
      const positionSetting = this.props.element.getResponsiveLockedSetting('sub_popover_position', "", "auto");

      popoverProps.position = this.getPosition(positionSetting)
      itemClasses += ` altrp-menu-item_${popoverProps.position} altrp-menu-item_subitem`

      popoverProps.portalClassName += " altrp-sub-portal"
    }


    const ref = React.createRef()

    if(popoverProps.position?.includes('top') || popoverProps.position?.includes('bottom')){
      popoverProps.matchTargetWidth = true
      popoverProps.onOpening = el=>{
        // console.log(el);
        // console.log(ref.current);
      }
    }


    return <>
      {items.map((item) => {
        const _popoverProps = {...popoverProps}
        _popoverProps.portalClassName += ` altrp-portal-parent-item-key${item.id} `
        return <MenuItem
          ref={ref}
          popoverProps={_popoverProps}
          depth={depth}
          href={item.url}
          width={100}
          className={`${classes} ${itemClasses} altrp-menu-item altrp-menu-item_key${item.id} altrp-menu-item${this.getSelector()} ${this.mbItemActive(item) ? 'active' : ''}`}
          key={item.id}
          onClick={(e) => {
            e.preventDefault();
            if(isEditor() || ! item.url){
              return;
            }
            if ( !this.props.history || ! item.url) {
              window.location.href = item.url
              return
            }
            this.props.history.push(item.url);
          }}
          icon={<span className={`${classes} altrp-menu-item__icon`} dangerouslySetInnerHTML={{__html: item.icon}}/>}
          // text={<Link className="altrp-menu-item__link" to={item.url}>{item.label}</Link>}>
          text={item.label}>
          {this.renderSubItems(item.children, depth + 1, item.id)}
        </MenuItem>

      })}
    </>
  }

  getPosition(setting) {
    let position;

    switch (setting) {
      case "auto":
        position = "auto";
        break
      case "top-left":
        position = Position.TOP_LEFT;
        break
      case "top-right":
        position = Position.TOP_RIGHT;
        break
      case "top":
        position = Position.TOP;
        break
      case "bottom-left":
        position = Position.BOTTOM_LEFT;
        break
      case "bottom-right":
        position = Position.BOTTOM_RIGHT;
        break
      case "bottom":
        position = Position.BOTTOM;
        break
      case "left-top":
        position = Position.LEFT_TOP;
        break
      case "left-bottom":
        position = Position.LEFT_BOTTOM;
        break
      case "left":
        position = Position.LEFT;
        break
      case "right-top":
        position = Position.RIGHT_TOP;
        break;
      case "right-bottom":
        position = Position.RIGHT_BOTTOM;
        break
      case "right":
        position = Position.RIGHT;
        break
      default:
        position = Position.AUTO
    }

    return position
  }

  renderButton = () => {
    const {menuData} = this;
    if (!menuData) {
      return null;
    }
    let toggle_icon = _.get(menuData, 'settings.toggle_icon', '')
    if(_.isEmpty(toggle_icon)){
      toggle_icon = defaultBurgerMenuIcon
    }

    const position = this.props.element.getResponsiveLockedSetting("popover_position_toggle", "", "auto")
    let classes =
      this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    return (
      <Popover2 content={this.renderVerticalMenu()}
        className={`${classes} altrp-popover`}
        position={position}
        portalContainer={window.EditorFrame ? window.EditorFrame.contentWindow.document.body : document.body}
        portalClassName={`altrp-portal altrp-portal_main altrp-portal${this.getSelector()}`}
        minimal={true}
      >
        <Button
          className={`${classes} altrp-menu-toggle`}
          text={toggle_icon ? <span className={`${classes} altrp-menu-item__icon`} dangerouslySetInnerHTML={{__html: toggle_icon}}/> : ''}
        />
      </Popover2>
    )
  }

  render() {
    this.getMenuData();
    let type = this.props.element.getResponsiveLockedSetting('type');
    let renderButton = this.props.element.getResponsiveLockedSetting('button');
    if (renderButton) {
      return <>
        {this.renderButton()}
      </>
    }
    switch (type) {
      case 'horizontal': {
        return <>
          {this.renderVerticalMenu()}
        </>
      }
      default: {
        return <>
          {this.renderVerticalMenu()}
        </>;
      }
    }
  }

  /**
   * Check if the given menu item is active (configurable in the admin panel)
   *
   * Проверяем является ли данный элемент меню активным (настраивается в админке)
   *
   * @param {{
   *   compare: string,
   *   value: string,
   *   path: string,
   * }} item
   * @returns {boolean}
   */
  mbItemActive(item) {
    if(! item || !item.operator || ! item.value || ! item.modelField){
      return false;
    }
    return conditionChecker(item, this.props.element.getCurrentModel())
  }
}

export default MenuWidget
