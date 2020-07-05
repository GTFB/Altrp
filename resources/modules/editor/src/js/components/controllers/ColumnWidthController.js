import React, {Component} from "react";
import {connect} from "react-redux";
import controllerDecorate from "../../decorators/controller";

const StructureWrapper = {
  width: "110px",
  cursor: "pointer"
}

const LeftBlock = {
  width: "105px",
  height: "45px",
  backgroundColor: "#a4afb7"
}

const PresetTitle = {
  textAlign: "center",
  paddingTop: "5px",
  fontStyle: "italic",
  fontSize: "11px",
  color: "#a4afb7"
}

class ColumnsWidthController extends Component {
  constructor(props) {
    super(props);
    let value = this.props.currentElement.getSettings(this.props.controlId);

    if(value === null & this.props.default) {
      value = this.props.default;
    }
    value = value || false;
    this.state = {
      value,
      show: true
    };
    controllerDecorate(this);
  }

  getDefaultValue(){
    return '';
  }

  handleClick() {
    alert('Work');
  }

  render() {
    if(this.state.show === false) {
      return '';
    }
    console.log(this.props.currentElement);
    return <div>
      <div className="altrp-control-structure">
        <div className="altrp-control-structure-wrapper" style={StructureWrapper} onClick={this.handleClick}>
          <div className="altrp-control-structure-sizefield">
            <div className="altrp-control-left-block" style={LeftBlock}></div>
          </div>
          <div className="altrp-control-structure-preset-title" style={PresetTitle}>100</div>
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
export default connect(mapStateToProps)(ColumnsWidthController);
