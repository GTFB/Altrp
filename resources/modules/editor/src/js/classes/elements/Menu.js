import BaseElement from './BaseElement';
import NavIcon from '../../../svgs/nav-menu.svg';
import { advancedTabControllers } from '../../decorators/register-controllers';
import {
  CONTROLLER_TEXT,
  CONTROLLER_SWITCHER,
  CONTROLLER_NUMBER,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SLIDER,
  CONTROLLER_QUERY,
  CONTROLLER_EVENT_HANDLER,
  TAB_CONTENT,
  TAB_STYLE, CONTROLLER_SELECT2, CONTROLLER_SELECT,
} from '../modules/ControllersManager';

class Map extends BaseElement {
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
      options: [
        {
          'label': 'Horizontal',
          'value': 'horizontal',
        },
        {
          'label': 'Vertical',
          'value': 'vertical',
        },
      ],
      default: 'horizontal'
    })

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default Map;
