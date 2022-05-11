import React, {Component} from "react";
import { connect } from "react-redux";
import Times from "../../../svgs/times.svg";
import { assetsToggle } from "../../store/assets-browser/actions";
import Resource from "../Resource";
import '../../../sass/assets-browser.scss';
import toDataURL from "../../helpers/to-data-url";


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
        },
        {
          name: "video", //TODO: логично было бы эту вкладку назвать Media
          title: "Video Library"
        }
      ],
      svgAssets: [],
      assets: this.getAssets("media"),
      // assets: this.getAssets('icons'),
      selectedAsset: null,
      mediaAssets: [],
      videoAssets: []
    };
    this.mediaResource = new Resource({ route: "/admin/ajax/media?type=image" });
    this.svgResource  =new Resource({ route: "/admin/ajax/media?type=svg" });
    this.videoResource = new Resource({ route: "/admin/ajax/media?type=media" });
  }

  componentDidUpdate(prevProps, nextContext) {
    if(this.props.tabs && prevProps.tabs !== this.props.tabs) {
      let tabs = [...this.state.tabs];
      let activeTab;
      tabs = tabs.filter(tab=>{
        if(this.props.tabs.indexOf(tab.name) !== -1 && ! activeTab){
          activeTab = tab.name;
        }
        return this.props.tabs.indexOf(tab.name) !== -1;
      });
      if(! activeTab){
        activeTab = 'media';
      }
      this.setState(state=>({...state, tabs, activeTab }), ()=>{this.setActiveTab(activeTab)})
    }
  }

  async componentDidMount() {
    try {
      this.videoResource.getAll()
        .then(videoAssets => this.setState({ videoAssets }));

      let resSvg = await this.svgResource.getAll();
      if(_.isArray(resSvg.media)){
        resSvg = resSvg.media
      }
      this.setState(state => {
        return { ...state, svgAssets: resSvg };
      });

      let resMedia = await this.mediaResource.getAll();
      if(_.isArray(resMedia.media)){
        resMedia = resMedia.media
      }
      this.setState(state => {
        state = { ...state, mediaAssets: resMedia };
        if (state.activeTab === "media") {
          state.assets = resMedia;
        }
        return state;
      });
    } catch (error) {
      console.log("error", error);
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === "Escape") {
          this.toggleBrowser();
      }
    });
  }
  getAssets(tab) {
    if (! tab) {
      tab = this.state.activeTab;
    }

    switch (tab) {
      case "icons": {
        return this.state.svgAssets
        // return [ ...iconsManager().getIconsList(), ...this.state.svgAssets];
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

  /**
   * функция добавляет контент самого изображения к возвращаемым данным об изображении
   * для вставки в HTML картинок в виде данных svg base64
   */
  insertRaw = ()=>{

    let asset;
    this.state.assets.forEach(item => {
      if (item.name === this.state.selectedAsset) {
        asset = item;
      }
    });
    if (!asset) {
      throw `Asset with name ${this.state.selectedAsset} not found in Assets Browser (${this.state.activeTab})!`;
    }
    if(asset.type === 'svg'){
      const resource = new Resource({route: asset.url});
      resource.getAsText().then(rawSVG=>{
        rawSVG = rawSVG.replace(/<!--[\s\S]*?-->/g, '')
        rawSVG = rawSVG.replace(/<![\s\S]*?>/g, '')
        rawSVG = rawSVG.replace(/<\?[\s\S]*?\?>/g, '')
        this.props.onChoose({...asset, rawSVG});
        this.props.dispatch(assetsToggle());
      });
    } else {
      toDataURL(asset.url, (dataUrl)=>{
        this.props.onChoose({...asset, dataUrl});
        this.props.dispatch(assetsToggle());
      })
    }
  }

  render() {
    const { videoAssets, activeTab } = this.state;
    const { rawEnable, } = this.props;
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
    if(! this.props.active){
      return  '';
    }

    return (
      <div className={classes}>
        <div className="assets-browser__bg" onClick={this.toggleBrowser} />
        <div className="assets-browser-content">
          <div className="assets-browser-top">
            <div className="caption">Append Media</div>
            <button className="btn_bare assets-browser__close" onClick={this.toggleBrowser} >
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
                  if(asset.iconComponent) {
                    AssetContent = asset.iconComponent;
                  } else {
                    AssetContent = "img";
                    asset.name = asset.filename;
                    assetProps.src = asset.url;
                  }

                  classes += " asset-choose_icon";
                  // assetProps.viewBox = '0 0 20 20';
                  // assetProps.viewport = '0 0 10 10';
                  assetProps.width = "35";
                  assetProps.height = "35";
                }
                if (this.state.activeTab === "media") {
                  AssetContent = "img";
                  assetProps.src = asset.url;
                  classes += " asset-choose_media";
                  asset.name = asset.filename;
                  asset.assetType = "media";
                }
                asset.assetType = this.state.activeTab
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
          {activeTab === 'video' && <div className="assets-browser-choose-frame">
            {videoAssets.map(video => <div key={video.id} className="assets-list__item item col-1" onClick={this.selectAsset}>
              <svg width="43" height="56" fill="none" xmlns="http://www.w3.org/2000/svg" className="item__icon-background">
                <path d="M30.485 0H1.463C.655 0 0 .655 0 1.926V55c0 .345.655 1 1.463 1h40.074c.808 0 1.463-.655 1.463-1V12.978c0-.696-.093-.92-.257-1.085L31.107.257A.884.884 0 0030.485 0z" fill="#F7F8F9"></path><path d="M31 .151V12h11.849L31 .151z" fill="#E0E1E6"></path><path d="M41.537 56H1.463A1.463 1.463 0 010 54.537V39h43v15.537c0 .808-.655 1.463-1.463 1.463z" fill="#7CA727"></path><path d="M18.262 52h-1.86v-6.07L13.96 52h-.806l-2.444-6.07V52H8.863v-8.67h2.587l2.106 5.238 2.106-5.239h2.6V52zM21.83 52h-1.846v-8.67h4.056c.91 0 1.62.268 2.132.805.52.529.78 1.192.78 1.99 0 .788-.26 1.45-.78 1.988-.52.537-1.23.806-2.132.806h-2.21V52zm1.963-4.706c.373 0 .676-.104.91-.312.243-.217.364-.503.364-.858s-.121-.637-.364-.845c-.234-.217-.537-.325-.91-.325H21.83v2.34h1.963zM33.556 52H31.71v-1.794h-4.147V48.75l3.445-5.42h2.548v5.251h1.118v1.625h-1.118V52zm-1.846-3.419v-3.614l-2.34 3.614h2.34z" fill="#fff"></path><path d="M16.923 28a.964.964 0 01-.444-.108.87.87 0 01-.479-.767v-12.25a.87.87 0 01.48-.768.972.972 0 01.94.03l10.153 6.124c.265.161.427.44.427.739 0 .3-.162.577-.427.738l-10.154 6.125a.968.968 0 01-.496.137zm.923-11.532v9.063L25.357 21l-7.51-4.532z" fill="#D5D7DE"></path><path d="M21 35c-7.72 0-14-6.28-14-14S13.28 7 21 7s14 6.28 14 14-6.28 14-14 14zm0-26.133C14.31 8.867 8.867 14.31 8.867 21c0 6.69 5.443 12.133 12.133 12.133 6.69 0 12.133-5.443 12.133-12.133 0-6.69-5.443-12.133-12.133-12.133z" fill="#D5D7DE"></path>
              </svg>
            </div>)}
          </div>}
          <div className="assets-browser-bottom">
            <button className={buttonClasses} onClick={this.chooseAsset}>
              Choose
            </button>
            {rawEnable && <button className={buttonClasses + ' ml-3'} onClick={this.insertRaw}>Insert Raw</button>}
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
