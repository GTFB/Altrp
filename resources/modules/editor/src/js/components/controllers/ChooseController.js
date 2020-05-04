import React, {Component} from "react";
import {connect} from "react-redux";
import Left from '../../../svgs/left.svg';
import Center from '../../../svgs/center.svg';
import Right from '../../../svgs/right.svg';
import InWidth from '../../../svgs/in_width.svg';
import DesktopIcon from '../../../svgs/desktopNew.svg'
import controllerDecorate from "../../decorators/controller";

class ChooseController extends Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value};
    controllerDecorate(this);
  };
  change (e) {
    let changeRemove = document.getElementsByClassName("control-container-choose-block");
    let choose = e.currentTarget.dataset.change;
    this._changeValue(choose);

    for (let i = 0; i < changeRemove.length; i++) {
      changeRemove[i].classList.remove("control-container-choose-block-active");
      changeRemove[i].children[0].setAttribute("fill", "#8E94AA");
    }
    e.currentTarget.classList.add("control-container-choose-block-active");
    e.currentTarget.children[0].setAttribute("fill", "#FFF");

  };

  render() {

    return <div className="controller-container controller-container_choose">
      <div className="controller-container__label">
        {this.props.label}
        <DesktopIcon className="conntroller-container__label-svg" width="12"/>
      </div>
      <div className="control-container-choose">
        <div className="control-container-choose-block control-container-choose-border-left" data-change="1" onClick={this.change}>
          <Left fill="#8E94AA"/>
        </div>
        <div className="control-container-choose-block control-container-choose-border-center-left" data-change="2" onClick={this.change}>
          <Center fill="#8E94AA"/>
        </div>
        <div className="control-container-choose-block" data-change="3" onClick={this.change}>
          <Right fill="#8E94AA"/>
        </div>
        <div className="control-container-choose-block control-container-choose-border-right" data-change="4" onClick={this.change}>
          <InWidth fill="#8E94AA"/>
        </div>
      </div>
    </div>
  }
};

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(ChooseController);
