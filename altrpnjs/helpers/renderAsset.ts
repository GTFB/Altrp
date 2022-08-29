import * as _ from 'lodash'
import objectToAttributesString from "./objectToAttributesString";
/**
 * @param {object} asset
 * @param {object} attrs
 * */
export default function renderAsset(asset, attrs:object | string  = {}) {
  if(_.isEmpty(asset)){
    return  ''
  }
  // @ts-ignore
  attrs = objectToAttributesString(attrs)
  if(asset.type === 'image' && asset.dataUrl){
    return `<img src="${asset.dataUrl}" ${attrs}/>`
  }
  if (asset.rawSVG && asset.type === "svg") {
    const startSvgTag = asset.rawSVG.indexOf('<svg')
    const endSvgTag = asset.rawSVG.indexOf('</svg') + 6

    return asset.rawSVG.slice(0, endSvgTag).slice(startSvgTag);
  }
  switch (asset.assetType) {
    // case "icon": {
    //   return iconsManager().renderIcon(asset.name, attrs);
    // }
    case "image":
    case "icons":
    case "media": {
      return `<img src="${asset.url}" ${attrs}/>`
    }
    case "mediaBackground": {
      return `<div src="${asset.url}" style="background-image: url('${asset.url}') ${attrs}/>`
    }
    case undefined: {
      return `<img src="/img/nullImage.png" ${attrs}/>`
    }
  }
  return "";
}
