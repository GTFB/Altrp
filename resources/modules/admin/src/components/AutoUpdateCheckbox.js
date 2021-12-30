import React, {Component} from "react";
import store from "./../js/store/store"
import {modelsToggle} from "../js/store/models-state/actions";
import {connect} from "react-redux";
import Resource from "../../../editor/src/js/classes/Resource";


class AutoUpdateCheckbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modelsChecked: this.props.modelsState,
    };

  }


  onChangeModels = async (e) => {
    let value = e.target.checked;
    await new Resource({
      route: "/admin/ajax/settings"
    }).put("altrp_models_disabled", { value });
    this.setState(state => {
      return {
        ...state,
        modelsChecked: value,
      }
    });
    store.dispatch(modelsToggle(value))
  }

  render() {
    let {className, type} = this.props

    return (
      <input type={type}
             className={className}
             checked={this.state.modelsChecked} onChange={this.onChangeModels}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modelsState: state.modelsState.toggleModels
  }
}

AutoUpdateCheckbox = connect(mapStateToProps)(AutoUpdateCheckbox)

export default AutoUpdateCheckbox;
