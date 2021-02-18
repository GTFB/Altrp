import {parseURLTemplate} from "../../../../../front-app/src/js/helpers";

/**
 * Возвращает шаблон колонки для письма
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
 */
export default function buttonElementEmailRender(){

  console.log(this.props.element.getSettings());
  const settings = this.props.element.getSettings();
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
  };
  const buttonProps = {
    style: buttonStyles,
  };
  const wrapperStyles = {
    display: 'block',
    textAlign: 'center',
  };
  const wrapperProps = {
    style: wrapperStyles,
  };
  return <div {...wrapperProps}
              children={React.createElement('a', buttonProps, settings.button_text || '')}/>;
  return React.createElement('a', buttonProps, settings.button_text || '');
}