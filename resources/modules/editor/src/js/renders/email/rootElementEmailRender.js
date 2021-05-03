import {isEditor} from "../../../../../front-app/src/js/helpers";

/**
 * Возвращает шаблон корневого элемента для письма
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
 */
export default function rootElementEmailRender() {
  let rootElementTag;
  rootElementTag = 'table';
  const elementProps = {
    border: "0",
    cellPadding: "0",
    cellSpacing: "0",
    width: "100%",
    style: {
      margin: 0,
      padding: 0,
      width: "100%",
      fontFamily: 'Arial, sans-serif'
    },
  };
  if (isEditor()) {
    rootElementTag = 'div';
    elementProps.className = 'sections-wrapper';
  }
  let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
  let childrenComponents = this.props.children.map(section => (
      <ElementWrapper
          ElementWrapper={ElementWrapper}
          key={section.getId()}
          component={section.componentClass}
          baseRender={this.props.baseRender}
          element={section}
      />
  ));
  if (!isEditor()) {
    childrenComponents = <tbody>{childrenComponents}</tbody>;
  }
  return React.createElement(rootElementTag, elementProps, childrenComponents);

}
