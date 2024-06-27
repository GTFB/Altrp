import AddIcon from '../../../../editor/src/svgs/add.svg'
import IconsManager from "../../../../editor/src/js/classes/modules/IconsManager";
import React from 'react'

const iconsManager = new IconsManager

class MediaController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };

  }

  openAssetsBrowser = (e)=> {
    e.preventDefault();
    e.stopPropagation();
    let assetsSettings = {
      active: true,
      onChoose: (assetValue) => {
        this.props.changeValue(assetValue);
      },
    };
    customizerStore.dispatch(window.storeActions.assetsShow(assetsSettings));
  }

  deleteAsset = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.changeValue({});
  }

  render() {
    if (this.state.show === false) {
      return '';
    }

    let value = this.props.value || {};
    let Asset = '';

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
          Asset = iconsManager.getIconComponent(value.name);
        }
          break;
        case 'media': {
          Asset = 'img';
          assetsProps.src = value.url;
        }
          break;
        case 'video': {
          if(value.media_type.indexOf('webm') > 1){
            Asset = iconsManager.getIconComponent('webm');
          } else {
            Asset = iconsManager.getIconComponent('mp4');
          }
          assetsProps.viewBox = '0 0 40 80'
        }
          break;
      }
    } else {
      Asset = AddIcon
      assetsProps.viewBox = '0 0 20 20'
    }


    return <div className="controller-container controller-container_media">
      <div className="controller-container__label">
        {this.props.label}
      </div>
       <div className="controller-media-choose controller-media-choose_customizer" onClick={this.openAssetsBrowser}>
        {renderedSvg || (Asset ? <Asset {...assetsProps} /> : '')}
         {value.assetType === 'video' && value.title && <span className="controller-media-choose__title">
           {value.title}
         </span>}
        {
          value.name ?
            <button className="controller-media-choose__button controller-media-choose__button_delete"
                    onClick={this.deleteAsset}>Delete</button> :
            <button className="controller-media-choose__button controller-media-choose__button_choose">Choose
              Media</button>
        }
      </div>

    </div>
  }
}

export default MediaController;
