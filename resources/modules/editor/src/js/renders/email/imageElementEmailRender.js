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
  const wrapperProps = {
    style: wrapperStyles,
  };
  console.log(settings);
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