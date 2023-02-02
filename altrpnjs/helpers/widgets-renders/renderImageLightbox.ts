import getResponsiveSetting from "../getResponsiveSetting"
import _ from 'lodash'
import AltrpImage from "./components/AltrpImage";
import parseURLTemplate from "../parseURLTemplate";
import altrpRandomId from "../altrpRandomId";
import objectToAttributesString from "../objectToAttributesString";

export default function renderImageLightbox(settings, device, widgetId) {
  const link = settings.image_link || {}
  const cursorPointer = getResponsiveSetting(settings,'cursor_pointer', device,false)

  let classNames = 'altrp-image-placeholder'
  let media = settings.content_media

  if(cursorPointer) {
    classNames += ' cursor-pointer'
  }

  if(getResponsiveSetting(settings,'raw_url', device)){
    media = {
      url: getResponsiveSetting(settings,'raw_url', device),
      assetType: 'media',
    }
  } else if (
    getResponsiveSetting(settings,'content_path', device, '') &&
    getResponsiveSetting(settings,'content_path', device, '').indexOf('.url') > -1
  ) {
    media ={
      url: `{{${getResponsiveSetting(settings,'content_path', device)}}}`,
      assetType : 'media'
    }
  } else if (
    getResponsiveSetting(settings,'content_path', device, '') &&
    getResponsiveSetting(settings,'content_path', device, '').indexOf('.url') === -1

  ) {
    media = {
      assetType: 'media',
      url: `{{${getResponsiveSetting(settings,'content_path', device)+'.url'}}}`,
      name: 'null',
    }
    // eslint-disable-next-line max-len
  } else if (getResponsiveSetting(settings,'default_url', device)){
    media = {
      assetType: 'media',
      url: `{{${getResponsiveSetting(settings,'default_url', device)}}}`,
      name: 'default',
    }
  }
  let width = getResponsiveSetting(settings, 'width_size', device)
  let height = getResponsiveSetting(settings,'height_size', device)
  width = _.get(width, 'size', '100') + _.get(width, 'unit', '%')
  if(_.get(height, 'size')){
    height = _.get(height, 'size') + _.get(height, 'unit', '%')
  } else {
    height = ''
  }

  if(_.get(getResponsiveSetting(settings, 'height_size', device), 'size', '100') === '0') {
    height = ''
  }
  let altrpImage = AltrpImage({image: media, widgetId,  width, height, settings, class: 'altrp-image' },)
  if (link.toPrevPage) {
    return `<div class='${classNames}'>${altrpImage}</div>`
  } else {
    let linkUrl = link?.url || ''
    linkUrl = parseURLTemplate(linkUrl)
    const linkProps: {
      target?: string,
      title?: string,
    } = {}
    if(link.openInNew){
      linkProps.target = altrpRandomId()
    }
    if(settings.content_media?.title){
      linkProps.title = settings.content_media.title
    }
    return `
    <div class="altrp-image-container">
    <div class='${classNames}'>${linkUrl ? `<a href='${linkUrl}'
     ${objectToAttributesString(linkProps)}>${altrpImage}</a>` : altrpImage }</div>
    </div>`
  }
}
// export default function renderImageLightbox(settings, device, ) {
//   const getMedia = () => {
//     let media = getResponsiveSetting(settings, 'content_media', device);
//     /**
//      * Возьмем данные из окружения
//      */
//     if (
//       getResponsiveSetting(settings, 'content_path', device) &&
//       _.isObject(_.get(getResponsiveSetting(settings, 'content_path', device), ))
//     ) {
//       media = _.get(getResponsiveSetting(settings, 'content_path', device), );
//       /**
//        * Проверим массив ли с файлами content_path
//        */
//       if (_.get(media, "0") instanceof File) {
//         media = _.get(media, "0");
//       } else {
//         media.assetType = "media";
//       }
//     } else if (
//       getResponsiveSetting(settings, 'content_path', device) &&
//       _.isString(_.get(getResponsiveSetting(settings, 'content_path', device), ))
//     ) {
//       media = _.get(getResponsiveSetting(settings, 'content_path', device), );
//       media = {
//         assetType: "media",
//         url: media,
//         name: "null"
//       };
//     } else if (getResponsiveSetting(settings, 'default_url', device)) {
//       media = {
//         assetType: "media",
//         url: getResponsiveSetting(settings, 'default_url', device),
//         name: "default"
//       };
//     }
//     return media
//   }
//
//   const cursorPointer = getResponsiveSetting(settings, "cursor_pointer", device, false);
//   const background_image = getResponsiveSetting(settings, "background_image", device, {});
//   const media = getMedia() || {}
//   let classNames = "altrp-image-placeholder";
//   if (cursorPointer) {
//     classNames += " cursor-pointer"
//   }
//
//   let width = getResponsiveSetting(settings, 'width_size', device);
//   let height = getResponsiveSetting(settings, 'height_size', device);
//   width = _.get(width, 'size', '100') + _.get(width, 'unit', '%');
//   height = _.get(height, 'size', '100') + _.get(height, 'unit', '%');
//
//   if (_.get(getResponsiveSetting(settings, 'height_size', device), 'size', '100') === "0") {
//     height = ""
//   }
//
//   media.url = media?.url || '/img/nullImage.png';
//   media.name = media.name || 'null';
//   media.assetType = media.assetType || undefined;
//
//   let image = renderAsset(media, {
//     'class': " altrp-image" + (background_image ? " altrp-background-image" : "")
//   });
//
//   return `
//   <div class="altrp-image-container">
//     <div class="${classNames}">
//       <div class="altrp-image-placeholder">
//         ${image}
//       </div>
//     </div>
//   </div>
//   `;
// }
