import BaseElement from './BaseElement';
import NavIcon from '../../../svgs/nav-menu.svg';
import { advancedTabControllers } from '../../decorators/register-controllers';
import {
  CONTROLLER_DIMENSIONS,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_COLOR,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_SHADOW, CONTROLLER_SWITCHER,
} from '../modules/ControllersManager';

class Menu extends BaseElement {
  static getName() {
    return 'menu';
  }
  static getTitle() {
    return 'Menu';
  }
  static getIconComponent() {
    return NavIcon;
  }
  static getType() {
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection('content_section', {
      tab: TAB_CONTENT,
      label: 'Content',
    });

    this.addControl('menu', {
      type: CONTROLLER_SELECT2,
      responsive: false,
      prefetch_options: true,
      label: 'Menu',
      isClearable: true,
      options_resource: '/admin/ajax/menus/options?value=guid',
      nullable: true,
      after: <div className="control-button-container mt-2"><button onClick={()=>{
        console.log(appStore);
      }} className="btn btn_success">Edit Menus</button></div>
    });

    this.addControl('type', {
      type: CONTROLLER_SELECT,
      label: 'Type',
      options: [
        {
          'label': 'Vertical',
          'value': 'vertical',
        },
        {
          'label': 'Horizontal',
          'value': 'horizontal',
        },
      ],
      default: 'vertical'
    })


    this.addControl('button', {
      label: 'Toggle Button',
      type: CONTROLLER_SWITCHER,
    })

    this.endControlSection();

    this.startControlSection('color_styles', {
      tab: TAB_STYLE,
      label: 'Colors',
    });

    this.endControlSection();

    this.startControlSection('menu_styles', {
      tab: TAB_STYLE,
      label: 'Menu',
    });

    this.addControl('menu_padding', {
      type: CONTROLLER_DIMENSIONS,
      stateless: true,
      label: 'Padding',
    })

    this.addControl('menu_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
    })

    this.addControl('menu_bg',{
      label: 'Background Color',
      type: CONTROLLER_COLOR,
    })

    this.endControlSection();

    this.startControlSection('items', {
      tab: TAB_STYLE,
      label: 'Items',
    });

    this.addControl('gap', {
      label: 'Items Gap',
      dynamic: false,
      stateless: true,
      description: '3px etc.'
    })

    this.addControl('padding', {
      type: CONTROLLER_DIMENSIONS,
      stateless: true,
      label: 'Padding',
    })

    this.addControl('typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
    })

    this.addControl('bg',{
      label: 'Background Color',
      type: CONTROLLER_COLOR,
    })

    this.addControl('color',{
      label: 'Text Color',
      type: CONTROLLER_COLOR,
    })

    this.endControlSection();

    this.startControlSection('sub_menu_styles', {
      tab: TAB_STYLE,
      label: 'Sub Menu',
    });

    this.addControl('sub_menu_padding', {
      type: CONTROLLER_DIMENSIONS,
      stateless: true,
      label: 'Padding',
    })

    this.addControl('sub_menu_bg',{
      label: 'Background Color',
      type: CONTROLLER_COLOR,
    })

    this.addControl('sub_menu_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
    })

    this.addControl('sub_menu_shadow',{
      label: 'Shadow',
      type: CONTROLLER_SHADOW,
    })

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default Menu;
