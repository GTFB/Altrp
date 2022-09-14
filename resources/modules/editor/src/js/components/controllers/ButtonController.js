import React, { Component } from "react";
import { connect } from "react-redux";
import {controllerMapStateToProps} from "../../decorators/controller";

class ButtonController extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // controllerDecorate(this);
  }

  onClick = () => {
    if(_.isFunction(this.props.onClick)) {
      this.props.onClick();
    }
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
      <div className="control-group control-button-container">
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
export default connect(controllerMapStateToProps)(ButtonController);
