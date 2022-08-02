import getResponsiveSetting from '../getResponsiveSetting';
import _ from 'lodash';
import renderAsset from '../renderAsset';

export default function renderImageLightbox(settings, device, context) {
  const getMedia = () => {
    let media = getResponsiveSetting(settings, 'content_media', device);
    /**
     * Возьмем данные из окружения
     */
    if (
      getResponsiveSetting(settings, 'content_path', device) &&
      _.isObject(_.get(getResponsiveSetting(settings, 'content_path', device), context))
    ) {
      media = _.get(getResponsiveSetting(settings, 'content_path', device), context);
      /**
       * Проверим массив ли с файлами content_path
       */
      if (_.get(media, '0') instanceof File) {
        media = _.get(media, '0');
      } else {
        media.assetType = 'media';
      }
    } else if (
      getResponsiveSetting(settings, 'content_path', device) &&
      _.isString(_.get(getResponsiveSetting(settings, 'content_path', device), context))
    ) {
      media = _.get(getResponsiveSetting(settings, 'content_path', device), context);
      media = {
        assetType: 'media',
        url: media,
        name: 'null',
      };
    } else if (getResponsiveSetting(settings, 'default_url', device)) {
      media = {
        assetType: 'media',
        url: getResponsiveSetting(settings, 'default_url', device),
        name: 'default',
      };
    }
    return media;
  };

  const cursorPointer = getResponsiveSetting(settings, 'cursor_pointer', device, false);
  const background_image = getResponsiveSetting(settings, 'background_image', device, {});
  const media = getMedia() || {};
  let classNames = 'altrp-image-container';
  if (cursorPointer) {
    classNames += ' cursor-pointer';
  }

  let width = getResponsiveSetting(settings, 'width_size', device);
  let height = getResponsiveSetting(settings, 'height_size', device);
  width = _.get(width, 'size', '100') + _.get(width, 'unit', '%');
  height = _.get(height, 'size', '100') + _.get(height, 'unit', '%');

  if (_.get(getResponsiveSetting(settings, 'height_size', device), 'size', '100') === '0') {
    height = '';
  }

  media.url = media?.url || '/img/nullImage.png';
  media.name = media.name || 'null';
  media.assetType = media.assetType || undefined;

  let image = renderAsset(media, {
    class: ' altrp-image' + (background_image ? ' altrp-background-image' : ''),
  });

  return `
    <div class="${classNames}">
      <div class="altrp-image-placeholder" height="${height}" width="${width}">
        ${image}
      </div>
    </div>
  `;
}
