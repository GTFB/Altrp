import BaseElement from './BaseElement';
import InputComponent from '../../components/widgets/Input';

class Input extends BaseElement{
  constructor(){
    super();
    this.title = 'Input';
    this.component = InputComponent;
  }
  static getName(){
    return 'input';
  }
}
export default Input;