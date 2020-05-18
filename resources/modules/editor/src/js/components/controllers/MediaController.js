import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import AddIcon from '../../../svgs/add.svg'
import controllerDecorate from "../../decorators/controller";
import {assetsShow} from "../../store/assets-browser/actions";
import {iconsManager} from "../../helpers";

class MediaController extends Component {
  constructor(props){
    super(props);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    // console.log(value);
    if(value === null && this.props.default && this.props.default.name){
      value = iconsManager().getIcon(this.props.default.name) ;
    }
    value = value || {};
    this.state = {value};
    this.openAssetsBrowser = this.openAssetsBrowser.bind(this);
    this.deleteAsset = this.deleteAsset.bind(this);
    controllerDecorate(this);
  }
  openAssetsBrowser(e){
    e.preventDefault();
    e.stopPropagation();
    let assetsSettings = {
      active:true,
      onChoose:  (assetValue)=> {
        this._changeValue(assetValue);
      },
    };
    this.props.dispatch(assetsShow(assetsSettings));
  }
  deleteAsset(e){
    e.preventDefault();
    e.stopPropagation();
    this._changeValue({});
  }
  getDefaultValue(){
    return {};
  }
  render(){
    let Asset = '';
    let assetClasses = 'icon';
    let width = 20;
    let height = 20;
    let viewBox = '0 0 20 20';
    if(this.state.value.name){
      assetClasses = `asset asset_${this.state.value.assetType}`;
      if(this.state.value.assetType === 'icon'){
        Asset = iconsManager().getIconComponent(this.state.value.name);
      }
      width = 90;
      height = 90;
      let viewBox = '0 0 90 90';
    } else {
      Asset = AddIcon
    }
    return <div className="controller-container controller-container_media">
      <div className="controller-container__label">
        {this.props.label}
      </div>
      <div className="controller-media-choose" onClick={this.openAssetsBrowser}>
        {Asset ? <Asset className={assetClasses}
                        height={height}
                        viewBox={viewBox}
                        width={width}/> : Asset}
        {
          this.state.value.name ?
            <button className="controller-media-choose__button controller-media-choose__button_delete" onClick={this.deleteAsset}>Delete</button> :
            <button className="controller-media-choose__button controller-media-choose__button_choose">Choose Media</button>
        }
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(MediaController);
