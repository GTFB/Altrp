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
  CONTROLLER_SHADOW,
} from '../modules/ControllersManager';

class Map extends BaseElement {
  static getName() {
    return 'breadcrumbs';
  }
  static getTitle() {
    return 'Breadcrumbs';
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



    advancedTabControllers(this);
  }
}
export default Map;
