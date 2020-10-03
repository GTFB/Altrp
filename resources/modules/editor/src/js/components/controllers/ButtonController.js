import React, { Component } from "react";
import { connect } from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";

class ButtonController extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // controllerDecorate(this);
  }

  onClick = () => {
    console.log(this.props);
  };

  render() {

    if (this.state.show === false) {
      return '';
    }
    const {buttonText = ''} = this.props;
    return <div className="controller-container controller-container_button">
      <div className="controller-container__label textcontroller-responsive">
        {this.props.label || ''}
      </div>
      <div className="control-group control-button-container" id="buttonList">
       <button onClick={this.onClick}
               className='btn btn_success' >{buttonText}</button>

      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen
  };
}
export default connect(mapStateToProps)(ButtonController);
