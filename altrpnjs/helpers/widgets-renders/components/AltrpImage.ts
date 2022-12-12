import _ from "lodash";
import objectToAttributesString from "../../objectToAttributesString";

export default function AltrpImage(props: any, ) {
  const {settings,  image} = props
  if (image?.rawSVG) {
    let svg = image?.rawSVG;
    let regex = new RegExp('[\\s\\r\\t\\n]*([a-z0-9\\-_]+)[\\s\\r\\t\\n]*=[\\s\\r\\t\\n]*([\'"])((?:\\\\\\2|(?!\\2).)*)\\2', 'ig'); //для работы с циклом
    let _props = {};
    let propsString = svg.match(/<svg(.*?)=\"(.*?)\">/gi) ? svg.match(/<svg(.*?)=\"(.*?)\">/gi)[0] : '';

    let match;
    while (match = regex.exec(propsString)) {
      _props[match[1]] = match[3];
    }
    svg = svg.replace(/<!--[\s\S]*?-->/g, '')
    svg = svg.replace(/<![\s\S]*?>/g, '')
    svg = svg.replace(/<\?[\s\S]*?\?>/g, '')
    svg = svg.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    const startSvgTag = svg.indexOf('<svg')
    const endSvgTag = svg.indexOf('</svg') + 6

    svg = svg.slice(0, endSvgTag).slice(startSvgTag);
    return `<svg xmlns="http://www.w3.org/2000/" class="altrp-image" ${objectToAttributesString(_props)}>${svg}</svg>`
  }
  let src:any = _.get(settings, 'content_media.url')
  let webpUrlEnable = false
  let webpUrl
  if (src) {
    src = src.split('.')
    webpUrl = [...src]
    if(['jpeg','png', 'jpg'].includes(src[src.length - 1])){
      webpUrlEnable = true
    }
    if(webpUrlEnable){
      webpUrl[webpUrl.length - 1] = 'webp'
      webpUrl = webpUrl.join('.')
    }
    src = src.join('.')
    src = `src="${src}"`
  } else {
    src = `src="/img/nullImage.png"`
  }

  if(! webpUrlEnable){
    return `
  <img class="altrp-image"
    alt="${image?.title ? `${image.title}` : 'nullImage'}"
    ${settings.raw_url ? `data-replace-attributes-if-exists="src|${settings.raw_url}"` : ''}
    width="${props.width}" height="${props.height}" ${src}/>`

  }

  return `
{{#accept_webp}}
 <img class="altrp-image"
    alt="${image?.title ? `${image.title}` : 'nullImage'}"
    ${settings.raw_url ? `data-replace-attributes-if-exists="src|${settings.raw_url}"` : ''}
    width="${props.width}" height="${props.height}" src="${webpUrl}"/>
{{/accept_webp}}
{{^accept_webp}}
 <img class="altrp-image"
    alt="${image?.title ? `${image.title}` : 'nullImage'}"
    ${settings.raw_url ? `data-replace-attributes-if-exists="src|${settings.raw_url}"` : ''}
    width="${props.width}" height="${props.height}" ${src}/>
{{/accept_webp}}
  `
}
