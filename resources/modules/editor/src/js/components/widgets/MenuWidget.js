import {getMenuByGUID} from "../../../../../front-app/src/js/functions/menus";
import {addMenu} from "../../../../../front-app/src/js/store/menus-storage/actions";
const { isEditor, mbParseJSON, conditionChecker} = window.altrpHelpers;


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
    let menuGUID = this.props.element.getResponsiveSetting('menu')
    if ((this.state.menuData || !menuGUID) && this.menuGUID === menuGUID || this.loading) {
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
    let renderButton = this.props.element.getResponsiveSetting('button');

    if (depth === 1 && element.getResponsiveSetting('type') === 'horizontal' && !renderButton) {
      popoverProps.position = Position.BOTTOM_LEFT;
    }
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


  renderButton = () => {
    const {menuData} = this.state;
    if (!menuData) {
      return null;
    }
    let toggle_icon = _.get(menuData, 'settings.toggle_icon', '')
    return <Popover2 content={this.renderVerticalMenu()}
                     className="altrp-popover"
                     portalContainer={window.EditorFrame ? window.EditorFrame.contentWindow.document.body : document.body}
                     portalClassName={`altrp-portal altrp-portal_main altrp-portal${this.elementId}`}
                     minimal={true}>
      <Button className="altrp-menu-toggle" text={toggle_icon ?
        <span className="altrp-menu-item__icon" dangerouslySetInnerHTML={{__html: toggle_icon}}/> : ''}/>
    </Popover2>
  }

  render() {
    this.getMenuData();
    let type = this.props.element.getResponsiveSetting('type');
    let renderButton = this.props.element.getResponsiveSetting('button');
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
