import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";

class ButtonController extends Component {
  constructor(props){
    super(props);
    this.changeValue = this.changeValue.bind(this)
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || false;
    this.state = {
      value,
    };
    controllerDecorate(this);
  }

  changeValue(e){
    this._changeValue({
      value: e.currentTarget.dataset.key
    });
    let noActive = [];
    let buttonList = document.getElementById("buttonList");
    for(let i=0; i < buttonList.children.length; i++) {
      if( i != e.currentTarget.dataset.key) {
        buttonList.children[i].classList.remove("control-button-active");
      };
    }
    e.currentTarget.classList.toggle("control-button-active");
  }

  render(){

    return <div className="controller-container controller-container_button">
      <div className="control-group" id="buttonList">
        {this.props.buttons.map((buttons) => {
          return <button key={buttons.key} id={"activeButton" + buttons.key} data-key={buttons.key} onClick={this.changeValue} style={buttons.styles}>{buttons.label}</button>
        })
      }
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(ButtonController);
