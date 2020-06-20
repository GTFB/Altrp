import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";
import {showDynamicContent} from "../../store/dynamic-content/actions";

class TextController extends Component {
  constructor(props){
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.openDynamicContent = this.openDynamicContent.bind(this);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    // console.log(value);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value};
    this.dynamicButton = React.createRef();
    controllerDecorate(this);
  }
  changeValue(e){
    this._changeValue(e.target.value)
  }

  /**
   * Открывает меню динамического контента при нажатии на иконку
   */
  openDynamicContent(){
    this.props.dispatch(showDynamicContent({
      type: 'text',

    }, this.dynamicButton))
  }
  getDefaultValue(){
    return '';
  }
  render(){

    return <div className="controller-container controller-container_text">
      <div className="controller-container__label">
        {this.props.label}
      </div>
      <div className="control-group">
        <input className="control-field" onChange={this.changeValue} value={this.state.value}/>
        <div className="control-group__append" ref={this.dynamicButton} onClick={this.openDynamicContent}>
          <DynamicIcon/>
        </div>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(TextController);
