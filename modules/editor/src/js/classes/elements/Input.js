import BaseElement from './BaseElement';

class Input extends BaseElement{
  constructor(props){
    super(props);
    this.title = 'Поле ввода';
  }
  render(){
   return(<input value={props.value}/>);
  }
  static getName(){
    return 'input';
  }
}
export default Input;