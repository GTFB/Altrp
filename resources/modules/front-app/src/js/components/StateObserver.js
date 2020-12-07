import React, {Component} from "react";
import {connect} from "react-redux";

class StateObserver extends Component {
  render() {
    const {elements} = this.props;
    const state = {elements};
    return <div style={{
      position: 'fixed',
      bottom: 0,
      right: 0,
      left: 0,
      overflow: 'auto',
      height: 100,
      backgroundColor: '#eee',
      zIndex: 1000,
    }}>
      {
        JSON.stringify(
          state
        )
      }
    </div>
  }
}
const mapStateToProps = (state) =>{
  return {
    elements: state.elements,
  }
};
export default connect(mapStateToProps)(StateObserver);