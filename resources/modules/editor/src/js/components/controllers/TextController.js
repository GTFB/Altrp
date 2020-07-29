import React, { Component } from "react";
import { connect } from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";
import { toggleDynamicContent } from "../../store/dynamic-content/actions";
import { iconsManager } from "../../../../../admin/src/js/helpers";

class TextController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.changeValue = this.changeValue.bind(this);
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || '';
    this.state = {
      value,
      dynamicValue: value.dynamic ? value : null,
      show: true
    };
    this.dynamicButton = React.createRef();
  }

  changeValue(e) {
    let variants = [
      /**
       * Вариант для одной колонки
       */
      [
        {
          name: '1_100',
          variants: [
            {
              title: '100',
              length: 100,
            }
          ]
        },
      ],
      /**
       * Вариант для двух колонок
       */
      [
        {
          name: '2_50',
          variants: [
            {
              title: '50',
              length: 50,
            },
            {
              title: '50',
              length: 50,
            },
          ]
        },
        {
          name: '2_33',
          variants: [
            {
              title: '33',
              length: 33.33,
            },
            {
              title: '66',
              length: 66.66,
            },
          ]
        },
      ],
    ];
    this._changeValue(e.target.value)
  }

  getDefaultValue() {
    return '';
  }

  render() {
    if (this.state.show === false) {
      return '';
    }
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    return <div className="controller-container controller-container_text">
      <div className="controller-container__label">
        {this.props.label}
      </div>
      <div className="control-group">
        {this.state.dynamicValue ? <div className="dynamic-placeholder control-field">
          <div className="dynamic-placeholder__text">
            {
              `${this.state.dynamicValue.modelTitle} ${this.state.dynamicValue.fieldTitle}`
            }
          </div>

          <div className="dynamic-placeholder__remove" onClick={this.removeDynamicSettings}>
            {
              iconsManager().renderIcon('times')
            }
          </div>
        </div> : <input className="control-field" onChange={this.changeValue} value={value} />
        }

        <div className="control-group__append" ref={this.dynamicButton} onClick={this.openDynamicContent}>
          <DynamicIcon />
        </div>
      </div>
    </div>

  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
  };
}

export default connect(mapStateToProps)(TextController);
