import React, { Component, Suspense } from "react";

import { TwitterPicker } from 'react-color';

class ColorPickerForFragment extends Component {
      constructor(props) {
            super(props);

            this.state = {
                  color: props.color,
                  keyData: props.keyData
            };
            this.changeColor = this.changeColor.bind(this);
      }

      componentDidUpdate(prevProps, prevState) {
            if (!_.isEqual(prevState.color, this.props.color)) {
                  // console.log('CHANGE COLOR =>', this.props.color);
                  this.setState(state => ({ ...state, color: this.props.color }));
            }
      }

      changeColor(color) {
            this.props.setColor(this.state.keyData, color.hex);
      }

      render() {
            return (
                  <div className="col mb-3">
                        <div>{this.state.keyData}</div>
                        <TwitterPicker width={210} triangle={'hide'} onChangeComplete={this.changeColor} color={this.state.color} />
                  </div>
            )
      }
      // onChange={e => this.setColor(this.state.keyData, e.target.value)}
}

export default ColorPickerForFragment;