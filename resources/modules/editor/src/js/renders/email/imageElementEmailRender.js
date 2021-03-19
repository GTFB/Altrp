import {getDataByPath, isEditor, prepareURLForEmail} from "../../../../../front-app/src/js/helpers";

/**
 * Возвращает шаблон колонки для письма
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
 */
export default function imageElementEmailRender(){
  const { element } = this.props;
  const settings = this.props.element.getSettings();
  
  let media = settings.content_media;
  const wrapperStyles = {
    display: 'block',
    textAlign: 'center',
  };

  if(settings['position_margin']) {
    wrapperStyles.marginTop = settings['position_margin'].top ? (settings['position_margin'].top + settings['position_margin'].unit) : wrapperStyles.marginTop;
    wrapperStyles.marginRight = settings['position_margin'].right ? (settings['position_margin'].right + settings['position_margin'].unit) : wrapperStyles.marginRight; 
    wrapperStyles.marginBottom = settings['position_margin'].bottom ? (settings['position_margin'].bottom + settings['position_margin'].unit) : wrapperStyles.marginBottom;
    wrapperStyles.marginLeft = settings['position_margin'].left ? (settings['position_margin'].left + settings['position_margin'].unit) : wrapperStyles.marginLeft ;
  }

  if(settings['position_padding']) {
    wrapperStyles.paddingTop = settings['position_padding'].top ? (settings['position_padding'].top + settings['position_padding'].unit) : wrapperStyles.paddingTop;
    wrapperStyles.paddingRight = settings['position_padding'].right ? (settings['position_padding'].right + settings['position_padding'].unit) : wrapperStyles.paddingRight;
    wrapperStyles.paddingBottom = settings['position_padding'].bottom ? (settings['position_padding'].bottom + settings['position_padding'].unit) : wrapperStyles.paddingBottom;
    wrapperStyles.paddingLeft = settings['position_padding'].left ? (settings['position_padding'].left + settings['position_padding'].unit) : wrapperStyles.paddingLeft;
  }
  
  if(settings['opacity_overlay']) {
    wrapperStyles.opacity = settings['opacity_overlay'].size;
  }

  if(settings['image_fit_size']) {
    wrapperStyles.objectFit = settings['image_fit_size'];
  }

  if(settings['aspect_ratio_off']) {
    wrapperStyles.position =  "relative";
  } else {
    wrapperStyles.position = "static";
  }

  if(settings['height_size']) {
    wrapperStyles.height = settings['height_size'].size + settings['height_size'].unit;
  }

  if(settings['width_size']) {
    wrapperStyles.width = settings['width_size'].size + settings['width_size'].unit;
  }

  if(settings['image_style_alignment']) {
    wrapperStyles.alignContent = settings['image_style_alignment'];
  }

  // if(settings['image_style_text_shadow']) {
  //   wrapperStyles.filter = `blur(${settings['image_style_text_shadow'].blur}) brightness(${settings['image_style_text_shadow'].brightness}) contrast(${settings['image_style_text_shadow'].contrast}) hue-rotate(${settings['image_style_text_shadow'].hue}) saturation(${settings['image_style_text_shadow'].saturate})`
  // }

  if(settings['background_color']) {
    wrapperStyles.backgroundColor = settings['background_color'].colorPickedHex;
  }

  if(settings['gradient'] && settings['gradient'].isWithGradient) {
    wrapperStyles.backgroundImage = settings['gradient'].value.slice(0, -1);
  }

  if(settings['background_image'].url) {
    wrapperStyles.backgroundImage = prepareURLForEmail(`url(${settings['background_image'].url})`);
  }

  if(settings['background_position']) {
    wrapperStyles.backgroundPosition = settings['background_position'];
  }

  if(settings['background_attachment']) {
    wrapperStyles.backgroundAttachment = settings['background_attachment'];
  }

  if(settings['background_repeat']) {
    wrapperStyles.backgroundRepeat = settings['background_repeat'];
  }

  if(settings['background_size']) {
    wrapperStyles.backgroundSize = settings['background_size'];
  }

  if(settings['border_type'] && settings['border_type'] !== "none") {
    wrapperStyles.borderTopWidth = settings['border_width'].top + settings['border_width'].unit;
    wrapperStyles.borderRightWidth = settings['border_width'].right + settings['border_width'].unit;
    wrapperStyles.borderBottomWidth = settings['border_width'].bottom + settings['border_width'].unit;
    wrapperStyles.borderLeftWidth = settings['border_width'].left + settings['border_width'].unit;
    wrapperStyles.borderStyle = settings['border_type'];
    if(settings['border_color'] && settings['border_color'].colorPickedHex)
      wrapperStyles.borderColor = settings['border_color'].colorPickedHex;
  }

  if(settings['border_radius']) {
    // let borderRadiusTop = settings['border_radius'].top + settings['border_radius'].unit;
    // let borderRadiusRight = settings['border_radius'].right + settings['border_radius'].unit;
    // let borderRadiusBottom = settings['border_radius'].bottom + settings['border_radius'].unit;
    // let borderRadiusLeft = settings['border_radius'].left + settings['border_radius'].unit;
    // wrapperStyles.borderRadius = `${borderRadiusTop} ${borderRadiusRight} ${borderRadiusBottom} ${borderRadiusLeft}`;
    wrapperStyles.borderRadius = settings['border_radius'].size + settings['border_radius'].unit;
  }

  if(settings['image_style_alignment']) {
    wrapperStyles.justifyContent = settings['image_style_alignment'];
    wrapperStyles.display = "flex";
  }
  console.log(settings)
  console.log(wrapperStyles)
  const wrapperProps = {
    style: wrapperStyles,
  };

  if(settings['aspect_ratio_size']) {
    wrapperStyles.paddingTop = settings['aspect_ratio_size'] + '%';
  }
  let model = element.hasCardModel()
      ? element.getCardModel()
      : this.props.currentModel;
  /**
   * Возьмем данные из окружения
   */
  if (
      settings.content_path &&
      _.isObject(getDataByPath(settings.content_path, null, model))
  ) {
    media = getDataByPath(settings.content_path, null, model);
    /**
     * Проверим массив ли с файлами content_path
     */
    if (_.get(media, "0") instanceof File) {
      media = _.get(media, "0");
    } else {
      media.assetType = "media";
    }
  } else if (
      settings.content_path &&
      _.isString(getDataByPath(settings.content_path, null, model))
  ) {
    media = getDataByPath(settings.content_path, null, model);
    media = {
      assetType: "media",
      url: media,
      name: "null"
    };
  }
  const imageProps = {
    src: prepareURLForEmail(media ? media.url : ""),
  };
  let wrapperTag = 'div';
  if(_.get(settings, 'image_link.url')){
    wrapperTag = 'a';
    wrapperProps.href = prepareURLForEmail(_.get(settings, 'image_link.url'));
  }
  return React.createElement(wrapperTag, wrapperProps, React.createElement('img', imageProps));
}