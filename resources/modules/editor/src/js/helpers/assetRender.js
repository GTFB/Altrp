/**
 * @param {object} asset
 * @param {object} props
 * */
export default function assetRender(asset, props){
  if(!iconsManager){
    return'';
  }
  switch (asset.assetType){
    case 'icon':{
      return iconsManager.renderIcon(asset.name, props)
    }
    case 'media':{
      props = props || {};
      props.src = asset.url;
      return React.createElement('img', props)
    }
  }
}