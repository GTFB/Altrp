import React, {Component} from "react";
import {connect} from "react-redux";
import Times from '../../../svgs/times.svg';
class AssetsBrowser extends Component {
  constructor(){
    super();
    this.tabClick = this.tabClick.bind(this);
    this.state = {
      activeTab: 'icons',
      tabs: [
        {
          name: 'upload',
          title: 'Upload Media File',
        },
        {
          name: 'icons',
          title: 'Icons Library',
        },
        {
          name: 'media',
          title: 'Media Library',
        },
      ],
    };
  }
  tabClick(e){
    let tab = e.target.dataset.tab;
    this.setActiveTab(e.target.dataset.tab)
  }
  setActiveTab(tab){
    this.setState(state=>{
      return{...state, activeTab: tab}
    })
  }
  render(){
    console.log(this.props);
    let classes = 'assets-browser';
    if(this.props.active){
      classes += ' assets-browser_active';
    }

    return<div className={classes}>
      <div className="assets-browser__bg"/>
      <div className="assets-browser-content">
        <div className="assets-browser-top">
          <div className="caption">Append Media</div>
          <button className="btn btn_bare assets-browser__close">
            <Times className="icon"/>
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
          (this.state.activeTab === 'icons') ?
              <div className="assets-browser-choose-frame assets-browser-choose-frame_icons" >

              </div> : ''
        }
        <div className="assets-browser-bottom">
          <button className="btn btn_success">Choose</button>
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
