import { head } from "lodash";
import {isEditor, parseURLTemplate, prepareURLForEmail} from "../../../../../front-app/src/js/helpers";

/**
 * Возвращает шаблон колонки для письма
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
 */
export default function headingElementEmailRender(){

  const settings = this.props.element.getSettings();
  const headingStyles = {
    display: 'block',
    fontSize: '24px',
    fontWeight: '700',
    textDecoration: 'none',
    color: '#242424',
  };

  if(settings['heading_style_typographic']) {
    headingStyles.textDecoration = settings['heading_style_typographic'].decoration || headingStyles.textDecoration;
    headingStyles.fontFamily = settings['heading_style_typographic'].family || headingStyles.fontFamily;
    headingStyles.lineHeight = settings['heading_style_typographic'].lineHeight || headingStyles.lineHeight;
    headingStyles.fontSize = settings['heading_style_typographic'].size ? (settings['heading_style_typographic'].size + 'px') : headingStyles.fontSize;
    headingStyles.letterSpacing = settings['heading_style_typographic'].spacing + 'px' || headingStyles.letterSpacing;
    headingStyles.fontStyle = settings['heading_style_typographic'].style || headingStyles.style;
    headingStyles.fontWeight = settings['heading_style_typographic'].weight || headingStyles.fontWeight;
    headingStyles.textTransform = settings['heading_style_typographic'].transform || headingStyles.textTransform;
  }

  if(settings['heading_style_color']) {
    headingStyles.color = settings['heading_style_color'].colorPickedHex;
  }

  if(settings['heading_style_text_shadow']) {
    let type = settings['heading_style_text_shadow'].type;
    let offsetX = settings['heading_style_text_shadow'].horizontal;
    let offsetY = settings['heading_style_text_shadow'].vertical;
    let blurRadius = settings['heading_style_text_shadow'].blur;
    let spreadRadius = settings['heading_style_text_shadow'].spread;
    let color = settings['heading_style_text_shadow'].colorPickedHex;
    headingStyles.boxShadow = `${type} ${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius} ${color}`;
  }

  if(settings['style_position_margin']) {
    headingStyles.marginTop = settings['style_position_margin'].top ? (settings['style_position_margin'].top + settings['style_position_margin'].unit) : headingStyles.marginTop;
    headingStyles.marginRight = settings['style_position_margin'].right ? (settings['style_position_margin'].right + settings['style_position_margin'].unit) : headingStyles.marginRight; 
    headingStyles.marginBottom = settings['style_position_margin'].bottom ? (settings['style_position_margin'].bottom + settings['style_position_margin'].unit) : headingStyles.marginBottom;
    headingStyles.marginLeft = settings['style_position_margin'].left ? (settings['style_position_margin'].left + settings['style_position_margin'].unit) : headingStyles.marginLeft ;
  }

  if(settings['style_position_padding']) {
    headingStyles.paddingTop = settings['style_position_padding'].top ? (settings['style_position_padding'].top + settings['style_position_padding'].unit) : headingStyles.paddingTop;
    headingStyles.paddingRight = settings['style_position_padding'].right ? (settings['style_position_padding'].right + settings['style_position_padding'].unit) : headingStyles.paddingRight;
    headingStyles.paddingBottom = settings['style_position_padding'].bottom ? (settings['style_position_padding'].bottom + settings['style_position_padding'].unit) : headingStyles.paddingBottom;
    headingStyles.paddingLeft = settings['style_position_padding'].left ? (settings['style_position_padding'].left + settings['style_position_padding'].unit) : headingStyles.paddingLeft;
  }

  if(settings['style_background_color']) {
    headingStyles.backgroundColor = settings['style_background_color'].colorPickedHex;
  }

  if(settings['gradient'] && settings['gradient'].isWithGradient) {
    headingStyles.backgroundImage = settings['gradient'].value.slice(0, -1);
  }

  if(settings['background_image'].url) {
    headingStyles.backgroundImage = `url(${settings['background_image'].url})`;
  }

  if(settings['background_position']) {
    headingStyles.backgroundPosition = settings['background_position'];
  }

  if(settings['background_attachment']) {
    headingStyles.backgroundAttachment = settings['background_attachment'];
  }

  if(settings['background_repeat']) {
    headingStyles.backgroundRepeat = settings['background_repeat'];
  }

  if(settings['background_size']) {
    headingStyles.backgroundSize = settings['background_size'];
  }

  if(settings['style_background_opacity']) {
    headingStyles.opacity = settings['style_background_opacity'].size;
  }

  if(settings['style_border_type'] && settings['style_border_type'] !== "none") {
    headingStyles.borderTopWidth = settings['style_border_width'].top + settings['style_border_width'].unit;
    headingStyles.borderRightWidth = settings['style_border_width'].right + settings['style_border_width'].unit;
    headingStyles.borderBottomWidth = settings['style_border_width'].bottom + settings['style_border_width'].unit;
    headingStyles.borderLeftWidth = settings['style_border_width'].left + settings['style_border_width'].unit;
    if(settings["style_border_width"].unit==="%") {
      headingStyles.borderTopWidth = settings['style_border_width'].top + 'vw';
      headingStyles.borderRightWidth = settings['style_border_width'].right + 'vw';
      headingStyles.borderBottomWidth = settings['style_border_width'].bottom + 'vw';
      headingStyles.borderLeftWidth = settings['style_border_width'].left + 'vw';
    }
    headingStyles.borderStyle = settings['style_border_type'];
    if(settings['style_border_color'] && settings['style_border_color'].colorPickedHex)
      headingStyles.borderColor = settings['style_border_color'].colorPickedHex;
  }

  if(settings['style_border_radius']) {
    // let borderRadiusTop = settings['border_radius'].top + settings['border_radius'].unit;
    // let borderRadiusRight = settings['border_radius'].right + settings['border_radius'].unit;
    // let borderRadiusBottom = settings['border_radius'].bottom + settings['border_radius'].unit;
    // let borderRadiusLeft = settings['border_radius'].left + settings['border_radius'].unit;
    // headingStyles.borderRadius = `${borderRadiusTop} ${borderRadiusRight} ${borderRadiusBottom} ${borderRadiusLeft}`;
    headingStyles.borderRadius = settings['style_border_radius'].size + settings['style_border_radius'].unit;
  }

  headingStyles.textDecoration = settings['style_border_text_decoration'] || headingStyles.textDecoration;

  if(settings['transform_style']) {
    headingStyles.transform = `${settings['transform_style'].function}(${settings['transform_style'].size}${settings['transform_style'].unit})`
  }
  if(settings['heading_settings_alignment']) {
    headingStyles.justifyContent = settings['heading_settings_alignment'];
    headingStyles.display = "flex";
  }
  let url = _.get(settings, 'link_link.url', location.origin) || '';
  url = prepareURLForEmail(url);
  const text = this.getContent('text') || '';
  const headingProps = {
    dangerouslySetInnerHTML:{
      __html: text,
    },
    href: isEditor() ? null : url,
    style: headingStyles,
  };
  const wrapperStyles = {
    display: 'block',
    textAlign: 'center',
  };
  const wrapperProps = {
    style: wrapperStyles,
  };
  let headingTag = url ? 'a' : 'div';
  return <div {...wrapperProps}
              children={React.createElement(headingTag, headingProps)}/>;
}