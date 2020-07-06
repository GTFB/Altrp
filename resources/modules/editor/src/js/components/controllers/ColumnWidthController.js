import React, {Component} from "react";
import {connect} from "react-redux";
import controllerDecorate from "../../decorators/controller";

const StructureWrapper = {
  width: "110px",
  cursor: "pointer"
}

const Sizefield = {
  display: "flex"
}

const LeftBlock = {
  width: "105px",
  height: "45px",
  backgroundColor: "#a4afb7"
}

const LeftSecondBlock = {
  width: "50px",
  height: "45px",
  backgroundColor: "#a4afb7",
  marginRight: "2px"
}

const RightSecondBlock = {
  width: "50px",
  height: "45px",
  backgroundColor: "#a4afb7"
}

const LeftThirdBlock = {
  width: "30px",
  height: "45px",
  backgroundColor: "#a4afb7",
  marginRight: "2px"
}

const RightThirdBlock = {
  width: "70px",
  height: "45px",
  backgroundColor: "#a4afb7"
}

const LeftForthBlock = {
  width: "70px",
  height: "45px",
  backgroundColor: "#a4afb7",
  marginRight: "2px"
}

const RightForthBlock = {
  width: "30px",
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
    if(this.props.currentElement.children.length > 1) {
      return '';
    }

    switch (this.props.currentElement.children.length) {
      case 1:
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
      break;
      case 2:
        return <div>
          <div className="altrp-control-structure">
            <div className="altrp-control-structure-wrapper" style={StructureWrapper} onClick={this.handleClick}>
              <div className="altrp-control-structure-sizefield" style={Sizefield}>
                <div className="altrp-control-left-block" style={LeftSecondBlock}></div>
                <div className="altrp-control-rigth-block" style={RightSecondBlock}></div>
              </div>
              <div className="altrp-control-structure-preset-title" style={PresetTitle}>50, 50</div>
            </div>
            <div className="altrp-control-structure-wrapper" style={StructureWrapper} onClick={this.handleClick}>
              <div className="altrp-control-structure-sizefield" style={Sizefield}>
                <div className="altrp-control-left-block" style={LeftThirdBlock}></div>
                <div className="altrp-control-left-block" style={RightThirdBlock}></div>
              </div>
              <div className="altrp-control-structure-preset-title" style={PresetTitle}>30, 70</div>
            </div>
            <div className="altrp-control-structure-wrapper" style={StructureWrapper} onClick={this.handleClick}>
              <div className="altrp-control-structure-sizefield" style={Sizefield}>
                <div className="altrp-control-left-block" style={LeftForthBlock}></div>
                <div className="altrp-control-left-block" style={RightForthBlock}></div>
              </div>
              <div className="altrp-control-structure-preset-title" style={PresetTitle}>70, 30</div>
            </div>
          </div>
        </div>
        break;
    }
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(ColumnsWidthController);
