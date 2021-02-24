import {isEditor, prepareURLForEmail} from "../../../../../front-app/src/js/helpers";

/**
 * Возвращает шаблон колонки для письма
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
 */
export default function textElementEmailRender(){

  const settings = this.props.element.getSettings();
  const wrapperStyles = {
    display: 'block',
  };

  if(settings['text_style_position_margin']) {
    wrapperStyles.marginTop = settings['text_style_position_margin'].top ? (settings['text_style_position_margin'].top + settings['text_style_position_margin'].unit) : wrapperStyles.marginTop;
    wrapperStyles.marginRight = settings['text_style_position_margin'].right ? (settings['text_style_position_margin'].right + settings['text_style_position_margin'].unit) : wrapperStyles.marginRight; 
    wrapperStyles.marginBottom = settings['text_style_position_margin'].bottom ? (settings['text_style_position_margin'].bottom + settings['text_style_position_margin'].unit) : wrapperStyles.marginBottom;
    wrapperStyles.marginLeft = settings['text_style_position_margin'].left ? (settings['text_style_position_margin'].left + settings['text_style_position_margin'].unit) : wrapperStyles.marginLeft ;
  }

  if(settings['text_style_position_padding']) {
    wrapperStyles.paddingTop = settings['text_style_position_padding'].top ? (settings['text_style_position_padding'].top + settings['text_style_position_padding'].unit) : wrapperStyles.paddingTop;
    wrapperStyles.paddingRight = settings['text_style_position_padding'].right ? (settings['text_style_position_padding'].right + settings['text_style_position_padding'].unit) : wrapperStyles.paddingRight;
    wrapperStyles.paddingBottom = settings['text_style_position_padding'].bottom ? (settings['text_style_position_padding'].bottom + settings['text_style_position_padding'].unit) : wrapperStyles.paddingBottom;
    wrapperStyles.paddingLeft = settings['text_style_position_padding'].left ? (settings['text_style_position_padding'].left + settings['text_style_position_padding'].unit) : wrapperStyles.paddingLeft;
  }

  if(settings['text_style_background_color']) {
    wrapperStyles.backgroundColor = settings['text_style_background_color'].colorPickedHex;
  }

  if(settings['text_style_background_opacity']) {
    wrapperStyles.opacity = settings['text_style_background_opacity'].size;
  }

  if(settings['text_style_font_typographic']) {
    wrapperStyles.textDecoration = settings['text_style_font_typographic'].decoration || wrapperStyles.textDecoration;
    wrapperStyles.fontFamily = settings['text_style_font_typographic'].family || wrapperStyles.fontFamily;
    wrapperStyles.lineHeight = settings['text_style_font_typographic'].lineHeight || wrapperStyles.lineHeight;
    wrapperStyles.fontSize = settings['text_style_font_typographic'].size ? (settings['text_style_font_typographic'].size + 'px') : wrapperStyles.fontSize;
    wrapperStyles.letterSpacing = settings['text_style_font_typographic'].spacing + 'px' || wrapperStyles.letterSpacing;
    wrapperStyles.fontStyle = settings['text_style_font_typographic'].style || wrapperStyles.style;
    wrapperStyles.fontWeight = settings['text_style_font_typographic'].weight || wrapperStyles.fontWeight;
    wrapperStyles.textTransform = settings['text_style_font_typographic'].transform || wrapperStyles.textTransform;
  }

  if(settings['text_style_font_color']) {
    wrapperStyles.color = settings['text_style_font_color'].colorPickedHex;
  }

  if(settings['text_style_border_type'] && settings['text_style_border_type'] !== "none") {
    wrapperStyles.borderTopWidth = settings['text_style_border_width'].top + settings['text_style_border_width'].unit;
    wrapperStyles.borderRightWidth = settings['text_style_border_width'].right + settings['text_style_border_width'].unit;
    wrapperStyles.borderBottomWidth = settings['text_style_border_width'].bottom + settings['text_style_border_width'].unit;
    wrapperStyles.borderLeftWidth = settings['text_style_border_width'].left + settings['text_style_border_width'].unit;
    wrapperStyles.borderStyle = settings['text_style_border_type'];
    if(settings['text_style_border_color'] && settings['text_style_border_color'].colorPickedHex)
      wrapperStyles.borderColor = settings['text_style_border_color'].colorPickedHex;
  }

  if(settings['text_style_border_radius']) {
    // let borderRadiusTop = settings['border_radius'].top + settings['border_radius'].unit;
    // let borderRadiusRight = settings['border_radius'].right + settings['border_radius'].unit;
    // let borderRadiusBottom = settings['border_radius'].bottom + settings['border_radius'].unit;
    // let borderRadiusLeft = settings['border_radius'].left + settings['border_radius'].unit;
    // wrapperStyles.borderRadius = `${borderRadiusTop} ${borderRadiusRight} ${borderRadiusBottom} ${borderRadiusLeft}`;
    wrapperStyles.borderRadius = settings['text_style_border_radius'].size + settings['text_style_border_radius'].unit;
  }

  let textContent = this.getContent("text");
  const wrapperProps = {
    style: wrapperStyles,
    dangerouslySetInnerHTML:{
      __html: textContent
    },
  };

  if (this.props.CKEditor) {
    return (
        <this.props.CKEditor
            changeText={this.changeText}
            text={textContent}
            readOnly={isEditor()}
            textWidget={true}
        />
    );
  }
  return <div {...wrapperProps} />;
}