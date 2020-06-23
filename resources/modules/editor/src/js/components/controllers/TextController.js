import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";
import {toggleDynamicContent} from "../../store/dynamic-content/actions";
import {iconsManager} from "../../../../../admin/src/js/helpers";

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
    this.state = {
      value,
      dynamicValue: null,
    };
    this.dynamicButton = React.createRef();
    controllerDecorate(this);
  }
  changeValue(e){
    this._changeValue(e.target.value)
  }

  /**
   * Открывает меню динамического контента при нажатии на иконку
   */
  openDynamicContent(e){
    e.stopPropagation();
    this.props.dispatch(toggleDynamicContent({
      type: 'text',
      onSelect: (dynamicValue)=>{
        this._changeValue(dynamicValue);
      }
    }, this.dynamicButton.current))
  }
  getDefaultValue(){
    return '';
  }
  render(){
    console.log(this.state.dynamicValue);

    return <div className="controller-container controller-container_text">
      <div className="controller-container__label">
        {this.props.label}
      </div>
      <div className="control-group">
        {this.state.dynamicValue ? <div className="dynamic-placeholder control-field">
          <div className="dynamic-placeholder__text">
            {
              `${this.state.dynamicValue.modelTitle} ${this.state.dynamicValue.fieldTitle}`
            }
          </div>

          <div className="dynamic-placeholder__remove">
            {
              iconsManager().renderIcon('times')
            }
          </div>
        </div> : <input className="control-field" onChange={this.changeValue} value={this.state.value}/>}

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
