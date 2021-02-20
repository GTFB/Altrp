import {isEditor} from "../../../../../front-app/src/js/helpers";

/**
 * Возвращает шаблон колонки для письма
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
 */
export default function columnElementEmailRender(){

  let columnElementTag;
  columnElementTag = 'td';
  const elementProps = {};
  if(isEditor()){
    columnElementTag = 'div';
    elementProps.className = 'altrp-column';
  }
  let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
  return React.createElement(columnElementTag, elementProps,
      this.state.children.map(column => (
          <ElementWrapper
              ElementWrapper={ElementWrapper}
              key={column.getId()}
              component={column.componentClass}
              baseRender={this.props.baseRender}
              element={column}
          />
      ))
  );
}