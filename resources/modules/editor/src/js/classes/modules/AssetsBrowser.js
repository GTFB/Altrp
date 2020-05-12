// import React, {Component} from "react";
import {connect} from "react-redux";
import Times from '../../../svgs/times.svg';
import {assetsToggle} from "../../store/assets-browser/actions";
import {iconsManager} from "../../helpers";
class AssetsBrowser extends Component {
  constructor(){
    super();
    this.tabClick = this.tabClick.bind(this);
    this.toggleBrowser = this.toggleBrowser.bind(this);
    this.selectAsset = this.selectAsset.bind(this);
    this.chooseAsset = this.chooseAsset.bind(this);
    this.state = {
      activeTab: 'icons',
      tabs: [
        // {
        //   name: 'upload',
        //   title: 'Upload Media File',
        // },
        {
          name: 'icons',
          title: 'Icons Library',
        },
        // {
        //   name: 'media',
        //   title: 'Media Library',
        // },
      ],
      assets: this.getAssets('icons'),
      selectedAsset: null,
    };
  }

  getAssets(tab){
    if(! tab){
      tab = this.state.activeTab;
    }

    switch (tab){
      case 'icons':{
        return iconsManager().getIconsList();
      }
    }
    return [];
  }

  selectAsset(e){
   let selectedAsset = e.currentTarget.dataset.assetname;
   this.setState(state=>{
     return{...state, selectedAsset};
   });
  }

  tabClick(e){
    this.setActiveTab(e.target.dataset.tab)
  }

  setActiveTab(tab){
    this.setState(state=>{
      return{...state, activeTab: tab}
    })
  }

  toggleBrowser(){
    this.setState(state=>{
      return{...state, selectedAsset:null};
    });
    this.props.dispatch(assetsToggle())
  }

  chooseAsset(){
    let asset;
    this.state.assets.forEach(item=>{
      if(item.name === this.state.selectedAsset){
        asset = item;
      }
    });
    if(!asset){
      throw `Asset with name ${this.state.selectedAsset} not found in Assets Browser (${this.state.activeTab})!`
    }
    this.props.onChoose(asset);
    this.setState(state=>{
      return{...state, selectedAsset: null}
    });
    this.props.dispatch(assetsToggle());
  }

  render(){
    let classes = 'assets-browser';
    if(this.props.active){
      classes += ' assets-browser_active';
    }
    let buttonClasses = 'btn btn_success';
    if(! this.state.selectedAsset){
      buttonClasses += ' btn_disabled';
    }
    return<div className={classes}>
      <div className="assets-browser__bg" onClick={this.toggleBrowser}/>
      <div className="assets-browser-content">
        <div className="assets-browser-top">
          <div className="caption">Append Media</div>
          <button className="btn btn_bare assets-browser__close">
            <Times className="icon" onClick={this.toggleBrowser}/>
          </button>
          <div className="assets-browser-nav">
            {this.state.tabs.map(tab=>{
              let tabClasses = 'assets-browser__tab';
              if(this.state.activeTab === tab.name){
                tabClasses += ' assets-browser__tab_active';
              }
              return <button className={tabClasses}
                             onClick={this.tabClick}
                             key={tab.name}
                             data-tab={tab.name}>{tab.title}</button>
                })}

          </div>
        </div>
        {
          (this.state.assets.length) ?
            <div className="assets-browser-choose-frame" >
              {
                this.state.assets.map(asset=>{
                  let AssetContent;
                  let classes = 'asset-choose';
                  if(this.state.activeTab === 'icons'){
                    AssetContent = asset.iconComponent;
                    classes += ' asset-choose_icon';
                  }
                  if(this.state.selectedAsset === asset.name){
                    classes += ' asset-choose_selected';
                  }
                  return <div className={classes}
                              data-assetname={asset.name}
                              key={asset.name}
                              onClick={this.selectAsset}>
                    <AssetContent className="asset-choose__content"/>
                  </div>})
              }
            </div> : ''
        }
        <div className="assets-browser-bottom">
          <button className={buttonClasses} onClick={this.chooseAsset}>Choose</button>
        </div>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    ...state.assetsManagerSettings,
  };
}

export default connect(mapStateToProps)(AssetsBrowser);
