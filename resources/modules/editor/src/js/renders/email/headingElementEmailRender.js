import {isEditor, parseURLTemplate, prepareURLForEmail} from "../../../../../front-app/src/js/helpers";

/**
 * Возвращает шаблон колонки для письма
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
 */
export default function headingElementEmailRender(){

  const settings = this.props.element.getSettings();
  const headingStyles = {
    fontSize: '24px',
    fontWeight: '700',
    textDecoration: 'none',
    color: '#242424',
  };
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