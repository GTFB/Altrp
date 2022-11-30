import {controllerMapStateToProps} from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import AddIcon from '../../../svgs/add.svg'
import controllerDecorate from "../../decorators/controller";
import { assetsShow } from "../../store/assets-browser/actions";
import { iconsManager } from "../../helpers";
import AltrpSVG from "../altrp-svg/AltrpSVG";
import {getFormat} from "../../../../../front-app/src/js/functions/getFormat";

const sizeOptions = [
    {
      'value': '_150x150',
      'label': '150x150',
    },
    {
      'value': '_300x300',
      'label': '300x300',
    },
    {
      'value': '_600x600',
      'label': '600x600',
    },
    {
      'value': '_1600x900',
      'label': '1600x900',
    },
    {
      'value': '',
      'label': 'Full',
    },
]

class MediaController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default && this.props.default.name) {
      value = iconsManager().getIcon(this.props.default.name);
    }
    value = value || {};
    this.state = {
      value,
      show: true,
      dynamicValue: value.dynamic ? value : null,
    };
    this.dynamicButton = React.createRef();
    this.openAssetsBrowser = this.openAssetsBrowser.bind(this);
    this.deleteAsset = this.deleteAsset.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  openAssetsBrowser(e) {
    e.preventDefault();
    e.stopPropagation();
    let assetsSettings = {
      active: true,
      onChoose: (assetValue) => {
        this._changeValue(assetValue);
      },
    };
    this.props.dispatch(assetsShow(assetsSettings));
  }

  deleteAsset(e) {
    e.preventDefault();
    e.stopPropagation();
    this._changeValue({});
  }

  getDefaultValue() {
    return {};
  }

  onChangeSelect(e) {
    if (this.state.value?.url) {
      let format = getFormat(this.state.value.filename)
      let mediaUrl = "/storage" + this.state.value.filename.slice(0, -(format.length)) + e.target.value + format
      let copyValue = _.cloneDeep(this.state.value)
      copyValue.url = mediaUrl
      copyValue.media_variation = e.target.value;
      this._changeValue(copyValue);
    }
  }

  render() {
    if (this.state.show === false) {
      return '';
    }

    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    let Asset = '';
    let assetClasses = 'icon';
    let viewBox = '0 0 20 20';
    let assetsProps = {
      width: 227,
      height: 90,
    };
    let renderedSvg = '';
    if (value.name) {
      assetsProps.className = `controller-media__asset controller-media__asset_${value.assetType || value.type || ''}`;
      if(value.type === 'svg' && value.url){
        renderedSvg = <AltrpSVG {...assetsProps} url={value.url}/>
      }
      switch (value.assetType) {
        case 'icon': {
          Asset = iconsManager().getIconComponent(value.name);
        }
          break;
        case 'media': {
          Asset = 'img';
          assetsProps.src = value.url;
        }
          break;
      }
    } else {
      Asset = AddIcon
    }

    return (
      <>
        <div className="controller-container controller-container_media">
          <div className="controller-container__label">
            {this.props.label}
          </div>
          {
            this.state.dynamicValue ? '' : <div className="controller-container__dynamic" ref={this.dynamicButton} onClick={this.openDynamicContent}>
              Dynamic
              <DynamicIcon />
            </div>
          }
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
          </div> : <div className="controller-media-choose" onClick={this.openAssetsBrowser}>
            {renderedSvg || (Asset ? <Asset {...assetsProps} /> : '')}
            {
              value.name ?
                <button className="controller-media-choose__button controller-media-choose__button_delete"
                        onClick={this.deleteAsset}>Delete</button> :
                <button className="controller-media-choose__button controller-media-choose__button_choose">Choose
                  Media</button>
            }
          </div>
          }
        </div>
        <div className="controller-container controller-container_select">
          <div className="controller-container__label control-select__label">Image Size</div>
          <div className="control-container_select-wrapper">
            <select disabled={!this.state.value?.url || this.state.value?.type === "svg"} onChange={this.onChangeSelect} value={this.state.value?.media_variation || ''} className="control-select control-field">
              {sizeOptions.map(option => {
                return <option value={option.value} key={option.value}>{option.label}</option>
              })}
            </select>
          </div>
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen
  };
}

export default connect(controllerMapStateToProps)(MediaController);
