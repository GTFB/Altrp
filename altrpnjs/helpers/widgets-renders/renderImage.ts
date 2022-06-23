import getResponsiveSetting from '../getResponsiveSetting'
import _ from 'lodash'
import parseURLTemplate from '../parseURLTemplate'
import objectToAttributesString from './../objectToAttributesString'
import AltrpImage from "./components/AltrpImage";

export default function renderImage(settings, device, widgetId) {
  const link = settings.image_link || {}
  const cursorPointer = getResponsiveSetting(settings,'cursor_pointer', device,false)

  let classNames = 'altrp-image-container'
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
  let altrpImage = AltrpImage({image: media, widgetId,  width, height, settings, class: 'altrp-image' }, device)
  if (link.toPrevPage) {
    return `<div class='${classNames}'>${altrpImage}</div>`
  } else {
    let linkUrl = link?.url || ''
    linkUrl = parseURLTemplate(linkUrl)
    const linkProps: {
      target?: string
    } = {}
    if(link.openInNew){
      linkProps.target = '_blank'
    }

    return `<div class='${classNames}'>${linkUrl ? `<a href='${linkUrl}' ${objectToAttributesString(linkProps)}>${altrpImage}</a>` : altrpImage }</div>`
  }
}

