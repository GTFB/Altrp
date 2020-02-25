import BaseElement from './BaseElement';
import IconComponent from '../../../img/heading__icon.svg'
import InputComponent from '../../components/widgets/Input';

class Input extends BaseElement{
  constructor(){
    super();
    this.title = 'Input';
    this.iconComponent = IconComponent;
    this.component = InputComponent;
  }
  static getName(){
    return 'input';
  }
}
export default Input;