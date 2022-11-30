import * as _ from 'lodash'
import objectToAttributesString from "./objectToAttributesString";
import toUnicode from "./string/toUnicode";
/**
 * @param {object} asset
 * @param {object} attrs
 * */
export default function renderAsset(asset, attrs:any  = {}) {
  if(_.isEmpty(asset)){
    return  ''
  }
  if(asset.title){
    attrs.alt = toUnicode(asset.title)
  }
  // @ts-ignore
  attrs = objectToAttributesString(attrs)
  if(asset.type === 'image' && asset.dataUrl){
    return `<img src="${asset.dataUrl}" ${attrs}/>`
  }
  if (asset.rawSVG && asset.type === "svg") {
    const startSvgTag = asset.rawSVG.indexOf('<svg')
    const endSvgTag = asset.rawSVG.indexOf('</svg') + 6

    return `<svg>${asset.rawSVG.slice(0, endSvgTag).slice(startSvgTag)}</svg>`;
  }
  switch (asset.assetType) {
    // case "icon": {
    //   return iconsManager().renderIcon(asset.name, attrs);
    // }
    case "image":
    case "icons":
    case "media": {

      let mbWebp = false
      let mbWebpUrl
      if(asset?.url){

        let src = asset?.url.split('.')
        if(['jpeg','png', 'jpg'].includes(src[src.length - 1])){
          src[src.length - 1] = 'webp'
          mbWebp = true
          mbWebpUrl = src.join('.')
        }
      }
      return mbWebp ?
        `
{{#accept_webp}}
<img src="${mbWebpUrl}" ${attrs}/>
{{/accept_webp}}
{{^accept_webp}}
<img src="${asset.url}" ${attrs}/>
{{/accept_webp}}
`
        :
        `<img src="${asset.url}" ${attrs}/>`
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
