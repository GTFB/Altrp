import React, {Component} from "react";
import { connect } from "react-redux";
import Times from "../../../svgs/times.svg";
import { assetsToggle } from "../../store/assets-browser/actions";
import { iconsManager } from "../../helpers";
import Resource from "../Resource";
import '../../../sass/assets-browser.scss';


class AssetsBrowser extends Component {
  constructor(props) {
    super(props);
    this.tabClick = this.tabClick.bind(this);
    this.toggleBrowser = this.toggleBrowser.bind(this);
    this.selectAsset = this.selectAsset.bind(this);
    this.chooseAsset = this.chooseAsset.bind(this);
    this.state = {
      // activeTab: 'icons',
      activeTab: "media",
      tabs: [
        // {
        //   name: 'upload',
        //   title: 'Upload Media File',
        // },
        {
          name: "icons",
          title: "Icons Library"
        },
        {
          name: "media",
          title: "Media Library"
        }
      ],
      assets: this.getAssets("media"),
      // assets: this.getAssets('icons'),
      selectedAsset: null,
      mediaAssets: []
    };
    this.mediaResource = new Resource({ route: "/admin/ajax/media?type=image" });
  }
  async componentDidMount() {
    try {
      let res = await this.mediaResource.getAll();

      this.setState(state => {
        state = { ...state, mediaAssets: res };
        if (state.activeTab === "media") {
          state.assets = res;
        }
        return state;
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  getAssets(tab) {
    if (!tab) {
      tab = this.state.activeTab;
    }

    switch (tab) {
      case "icons": {
        return iconsManager().getIconsList();
      }
      case "media": {
        return this.state ? this.state.mediaAssets : [];
      }
    }
    return [];
  }

  selectAsset(e) {
    let selectedAsset = e.currentTarget.dataset.assetname;
    this.setState(state => {
      return { ...state, selectedAsset };
    });
  }

  tabClick(e) {
    this.setActiveTab(e.target.dataset.tab);
  }

  setActiveTab(tab) {
    this.setState(state => {
      return { ...state, activeTab: tab, assets: this.getAssets(tab) };
    });
  }

  toggleBrowser() {
    this.setState(state => {
      return { ...state, selectedAsset: null };
    });
    this.props.dispatch(assetsToggle());
  }

  chooseAsset() {
    let asset;
    this.state.assets.forEach(item => {
      if (item.name === this.state.selectedAsset) {
        asset = item;
      }
    });
    if (!asset) {
      throw `Asset with name ${this.state.selectedAsset} not found in Assets Browser (${this.state.activeTab})!`;
    }
    this.props.onChoose(asset);
    this.setState(state => {
      return { ...state, selectedAsset: null };
    });
    this.props.dispatch(assetsToggle());
  }

  render() {
    let classes = "assets-browser";
    if (this.props.active) {
      classes += " assets-browser_active";
    }
    let buttonClasses = "btn";
    if (!this.state.selectedAsset) {
      buttonClasses += " btn_disabled";
    } else {
      buttonClasses += " btn_success";
    }
    return (
      <div className={classes}>
        <div className="assets-browser__bg" onClick={this.toggleBrowser} />
        <div className="assets-browser-content">
          <div className="assets-browser-top">
            <div className="caption">Append Media</div>
            <button className="btn btn_bare assets-browser__close" onClick={this.toggleBrowser} >
              <Times className="icon"/>
            </button>
            <div className="assets-browser-nav">
              {this.state.tabs.map(tab => {
                let tabClasses = "assets-browser__tab";
                if (this.state.activeTab === tab.name) {
                  tabClasses += " assets-browser__tab_active";
                }
                return (
                  <button
                    className={tabClasses}
                    onClick={this.tabClick}
                    key={tab.name}
                    data-tab={tab.name}
                  >
                    {tab.title}
                  </button>
                );
              })}
            </div>
          </div>
          {this.state.assets.length ? (
            <div className="assets-browser-choose-frame">
              {this.state.assets.map(asset => {
                let AssetContent;
                let classes = "asset-choose";
                let assetProps = {
                  className: "asset-choose__content"
                };
                if (this.state.activeTab === "icons") {
                  AssetContent = asset.iconComponent;
                  classes += " asset-choose_icon";
                  // assetProps.viewBox = '0 0 20 20';
                  // assetProps.viewport = '0 0 10 10';
                  assetProps.width = "20";
                  assetProps.height = "20";
                }
                if (this.state.activeTab === "media") {
                  AssetContent = "img";
                  assetProps.src = asset.url;
                  classes += " asset-choose_media";
                  asset.name = asset.filename;
                  asset.assetType = "media";
                }
                if (this.state.selectedAsset === asset.name) {
                  classes += " asset-choose_selected";
                }
                return (
                  <div
                    className={classes}
                    data-assetname={asset.name}
                    key={asset.name}
                    onClick={this.selectAsset}
                  >
                    <AssetContent {...assetProps} />
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
          <div className="assets-browser-bottom">
            <button className={buttonClasses} onClick={this.chooseAsset}>
              Choose
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.assetsManagerSettings
  };
}

export default connect(mapStateToProps)(AssetsBrowser);
