import React, {Component} from "react";
import {connect} from "react-redux";
import controllerDecorate from "../../decorators/controller";

const AreaButtons = {
  textAlign: "center"
}

const Buttons = {
  border: "2px solid #343b4c",
  backgroundColor: "#ffffff",
  color: "#343b4c",
  borderRadius: "5px",
  minWidth: "50px",
  padding: "6px",
  marginRight: "5px",
  fontSize: "11px",
  fontWeight: "bold"
}

const ChooseButton = {
  border: "2px solid #343b4c",
  backgroundColor: "#343b4c",
  color: "#ffffff",
  borderRadius: "5px",
  minWidth: "50px",
  padding: "6px",
  marginRight: "5px",
  fontSize: "11px",
  fontWeight: "bold"
}


class StyleStateController extends Component {
  constructor(props) {
    super(props);
    let value = this.props.currentElement.getSettings(this.props.controlId);

    if(value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || false;
    this.state = {
      value,
      show: true,
      buttons: [
        {
          title: 'Normal',
          active: true,
        },
        {
          title: 'Hover',
          active: false,
        },
        {
          title: 'Active',
          active: false,
        },
        {
          title: 'Disabled',
          active: false,
        }
      ]
    };
    this.handleClick = this.handleClick.bind(this);
    controllerDecorate(this);
  }

  handleClick(id) {
   const buttons = this.state.buttons.map((button, index) => {
     if(id === index) {
       button.active = true;
     } else {
       button.active = false;
     }
     return button;
   })
    this.setState({
      buttons
    })

  }

  getDefaultValue(){
    return '';
  }

  render() {
    if(this.state.show === false) {
      return '';
    }

    return <div className="stylestate-area-buttons" style={AreaButtons}>
      {
        this.state.buttons.map((buttons, index) => {
          return <button className="stylestate-area-buttons" key={index} style={this.state.buttons[index].active ? ChooseButton : Buttons} onClick={() => {this.handleClick(index)}}>{buttons.title}</button>
        })
      }
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(StyleStateController);
