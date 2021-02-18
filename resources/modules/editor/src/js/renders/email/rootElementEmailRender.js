import {isEditor} from "../../../../../front-app/src/js/helpers";
/**
 * Возвращает шаблон корневого элемента для письма
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
 */
export default function rootElementEmailRender(){
  let rootElementTag;
  rootElementTag = 'table';
  const elementProps = {};
  if(isEditor()){
    rootElementTag = 'div';
    elementProps.className = 'sections-wrapper';
  }
  let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
  let childrenComponents = this.state.children.map(section => (
      <ElementWrapper
          ElementWrapper={ElementWrapper}
          key={section.getId()}
          component={section.componentClass}
          element={section}
      />
  ));
  if(! isEditor()){
    childrenComponents = <tbody>{childrenComponents}</tbody>;
  }
  return React.createElement(rootElementTag, elementProps, childrenComponents);

}