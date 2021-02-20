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