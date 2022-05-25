import {getMenuByGUID} from "../../../../../front-app/src/js/functions/menus";
import {addMenu} from "../../../../../front-app/src/js/store/menus-storage/actions";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import conditionChecker from "../../../../../front-app/src/js/functions/conditionChecker";
import mbParseJSON from "../../../../../front-app/src/js/functions/mb-parse-JSON";


const {Button, ButtonGroup, Menu, MenuItem, Position} = window.altrpLibs.Blueprint;
const Popover2 = window.altrpLibs.Popover2;

(window.globalDefaults = window.globalDefaults || []).push(`
.altrp-menu-item__icon svg {
    display: block;
    height: 20px;
    width: 20px;
}

.altrp-menu {
  display: flex;
  flex-wrap: wrap;
}
`)

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
    let menuGUID = this.props.element.getResponsiveLockedSetting('menu')
    if ((this.state.menuData || !menuGUID) && this.menuGUID === menuGUID || this.loading) {
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
    this.setState(state => ({...state, menuData}), () => {
      this.loading = false;
      this.menuGUID = menuGUID
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
            if(! item.url || isEditor() ){
              return;
            }
            if (!this.props.history) {
              window.location.href = item.url
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
    let renderButton = this.props.element.getResponsiveLockedSetting('button');

    // if (depth === 1 && element.getResponsiveLockedSetting('type') === 'horizontal' && !renderButton) {
    //   popoverProps.position = Position.BOTTOM_LEFT;
    // }

    if(depth === 1) {
      const positionSetting = this.props.element.getResponsiveLockedSetting('popover_position', "", "auto");

      popoverProps.position = this.getPosition(positionSetting)

      popoverProps.portalClassName += " altrp-menu-first-portal"
    } else {
      const positionSetting = this.props.element.getResponsiveLockedSetting('sub_popover_position', "", "auto");

      popoverProps.position = this.getPosition(positionSetting)

      popoverProps.portalClassName += " altrp-sub-portal"
    }

    let caret = "";

    // const caretMedia = this.props.element.getResponsiveLockedSetting("caret");
    //
    // if(caretMedia?.type) {
    //   caret = caretMedia
    // }

    return <>
      {items.map((item) => {
        return <MenuItem
          popoverProps={popoverProps}
          depth={depth}
          href={item.url}
          width={100}
          className={`altrp-menu-item altrp-menu-item${this.elementId} ${this.mbItemActive(item) ? 'active' : ''}`}
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
          icon={<span className="altrp-menu-item__icon" dangerouslySetInnerHTML={{__html: item.icon}}/>}
          // text={<Link className="altrp-menu-item__link" to={item.url}>{item.label}</Link>}>
          text={item.label}>
          {this.renderSubItems(item.children, depth + 1)}
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
    const {menuData} = this.state;
    if (!menuData) {
      return null;
    }
    let toggle_icon = _.get(menuData, 'settings.toggle_icon', '')
    const position = this.props.element.getResponsiveLockedSetting("popover_position_toggle", "", "auto")
    return (
      <Popover2 content={this.renderVerticalMenu()}
        className="altrp-popover"
        position={position}
        portalContainer={window.EditorFrame ? window.EditorFrame.contentWindow.document.body : document.body}
        portalClassName={`altrp-portal altrp-portal_main altrp-portal${this.elementId}`}
        minimal={true}
      >
        <Button
          className="altrp-menu-toggle"
          text={toggle_icon ? <span className="altrp-menu-item__icon" dangerouslySetInnerHTML={{__html: toggle_icon}}/> : ''}
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
