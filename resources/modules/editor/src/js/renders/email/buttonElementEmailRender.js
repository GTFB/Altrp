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
  const wrapperProps = {
    style: wrapperStyles,
  };
  return <div {...wrapperProps}
              children={React.createElement('a', buttonProps)}/>;
}