import {isEditor, parseURLTemplate, prepareURLForEmail} from "../../../../../front-app/src/js/helpers";

/**
 * Возвращает шаблон колонки для письма
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
 */
export default function buttonElementEmailRender(){

  const settings = this.props.element.getSettings();
  const text = this.getContent('button_text') || '';
  const buttonStyles = {
    paddingTop: '20px',
    paddingRight: '25px',
    paddingBottom: '20px',
    paddingLeft: '25px',
    fontSize: '16px',
    fontFamily: "Open Sans",
    lineHeight: '1',
    letterSpacing: '0',
    fontWeight: 'normal',
    color: 'white',
    borderColor: '#32a852',
    borderRadius: '6px',
    boxShadow: '0 0 0 0 black',
    backgroundColor: '#343b4c',
    backgroundPosition: 'top left',
    backgroundAttachment: 'scroll',
    backgroundRepeat: 'repeat',
    width: 'auto',
    display: 'inline-block',
    textDecoration: 'none'
  };

  if(settings['position_margin']) {
    buttonStyles.marginTop = settings['position_margin'].top ? (settings['position_margin'].top + settings['position_margin'].unit) : buttonStyles.marginTop;
    buttonStyles.marginRight = settings['position_margin'].right ? (settings['position_margin'].right + settings['position_margin'].unit) : buttonStyles.marginRight; 
    buttonStyles.marginBottom = settings['position_margin'].bottom ? (settings['position_margin'].bottom + settings['position_margin'].unit) : buttonStyles.marginBottom;
    buttonStyles.marginLeft = settings['position_margin'].left ? (settings['position_margin'].left + settings['position_margin'].unit) : buttonStyles.marginLeft ;
  }

  if(settings['position_padding']) {
    buttonStyles.paddingTop = settings['position_padding'].top ? (settings['position_padding'].top + settings['position_padding'].unit) : buttonStyles.paddingTop;
    buttonStyles.paddingRight = settings['position_padding'].right ? (settings['position_padding'].right + settings['position_padding'].unit) : buttonStyles.paddingRight;
    buttonStyles.paddingBottom = settings['position_padding'].bottom ? (settings['position_padding'].bottom + settings['position_padding'].unit) : buttonStyles.paddingBottom;
    buttonStyles.paddingLeft = settings['position_padding'].left ? (settings['position_padding'].left + settings['position_padding'].unit) : buttonStyles.paddingLeft;
  }

  if(settings['background_color']) {
    buttonStyles.backgroundColor = settings['background_color'].colorPickedHex;
  }

  if(settings['gradient'] && settings['gradient'].isWithGradient) {
    buttonStyles.backgroundImage = settings['gradient'].value.slice(0, -1);
  }

  if(settings['background_image'].url) {
    buttonStyles.backgroundImage = `url(${settings['background_image'].url})`;
  }

  if(settings['background_position']) {
    buttonStyles.backgroundPosition = settings['background_position'];
  }

  if(settings['background_attachment']) {
    buttonStyles.backgroundAttachment = settings['background_attachment'];
  }

  if(settings['background_repeat']) {
    buttonStyles.backgroundRepeat = settings['background_repeat'];
  }

  if(settings['background_size']) {
    buttonStyles.backgroundSize = settings['background_size'];
  }

  if(settings['border_type'] && settings['border_type'] !== "none") {
    buttonStyles.borderTopWidth = settings['border_width'].top + settings['border_width'].unit;
    buttonStyles.borderRightWidth = settings['border_width'].right + settings['border_width'].unit;
    buttonStyles.borderBottomWidth = settings['border_width'].bottom + settings['border_width'].unit;
    buttonStyles.borderLeftWidth = settings['border_width'].left + settings['border_width'].unit;
    buttonStyles.borderStyle = settings['border_type'];
    if(settings['border_color'] && settings['border_color'].colorPickedHex)
      buttonStyles.borderColor = settings['border_color'].colorPickedHex;
  }

  if(settings['border_radius']) {
    let borderRadiusTop = settings['border_radius'].top + settings['border_radius'].unit;
    let borderRadiusRight = settings['border_radius'].right + settings['border_radius'].unit;
    let borderRadiusBottom = settings['border_radius'].bottom + settings['border_radius'].unit;
    let borderRadiusLeft = settings['border_radius'].left + settings['border_radius'].unit;
    buttonStyles.borderRadius = `${borderRadiusTop} ${borderRadiusRight} ${borderRadiusBottom} ${borderRadiusLeft}`;
  }

  if(settings['style_background_shadow']) {
    let type = settings['style_background_shadow'].type;
    let offsetX = settings['style_background_shadow'].horizontal;
    let offsetY = settings['style_background_shadow'].vertical;
    let blurRadius = settings['style_background_shadow'].blur;
    let spreadRadius = settings['style_background_shadow'].spread;
    let color = settings['style_background_shadow'].colorPickedHex;
    buttonStyles.boxShadow = `${type} ${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius} ${color}`;
  }

  if(settings['font_typographic']) {
    buttonStyles.textDecoration = settings['font_typographic'].decoration || buttonStyles.textDecoration;
    buttonStyles.fontFamily = settings['font_typographic'].family || buttonStyles.fontFamily;
    buttonStyles.lineHeight = settings['font_typographic'].lineHeight || buttonStyles.lineHeight;
    buttonStyles.fontSize = settings['font_typographic'].size ? (settings['font_typographic'].size + 'px') : buttonStyles.fontSize;
    buttonStyles.letterSpacing = settings['font_typographic'].spacing + 'px' || buttonStyles.letterSpacing;
    buttonStyles.fontStyle = settings['font_typographic'].style || buttonStyles.style;
    buttonStyles.fontWeight = settings['font_typographic'].weight || buttonStyles.fontWeight;
    buttonStyles.textTransform = settings['font_typographic'].transform || buttonStyles.textTransform;
  }

  if(settings['font_color']) {
    buttonStyles.color = settings['font_color'].colorPickedHex;
  }

  let url = _.get(settings, 'link_link.url', location.origin) || '';
  url = prepareURLForEmail(url);
  const buttonProps = {
    style: buttonStyles,
    href: isEditor() ? null : url,
    dangerouslySetInnerHTML:{
      __html: text,
    },
  };
  const wrapperStyles = {
    display: 'block',
    textAlign: 'center',
  };

  if(settings['button_alignment']) {
    wrapperStyles.justifyContent = settings['button_alignment'];
    wrapperStyles.display = "flex";
  }
  
  const wrapperProps = {
    style: wrapperStyles,
  };
  
  return <div {...wrapperProps}
              children={React.createElement('a', buttonProps)}/>;
}