import {isEditor} from "../../../../../front-app/src/js/helpers";

/**
 * Возвращает шаблон колонки для письма
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
 */
export default function columnElementEmailRender(){
  const settings = this.props.element.getSettings();
  let columnElementTag;
  columnElementTag = 'td';
  let width = (settings.layout_column_width || '100') + '%';
  const elementProps = {
    width,
    style: {
      paddingLeft: _.get(settings, 'positioning_padding.left', '10') + _.get(settings, 'positioning_padding.unit', 'px'),
      paddingRight: _.get(settings, 'positioning_padding.right', '10') + _.get(settings, 'positioning_padding.unit', 'px'),
      paddingTop: _.get(settings, 'positioning_padding.top', '10') + _.get(settings, 'positioning_padding.unit', 'px'),
      paddingBottom: _.get(settings, 'positioning_padding.bottom', '10') + _.get(settings, 'positioning_padding.unit', 'px'),
      marginLeft: _.get(settings, 'positioning_margin.left', '10') + _.get(settings, 'positioning_margin.unit', 'px'),
      marginRight: _.get(settings, 'positioning_margin.right', '10') + _.get(settings, 'positioning_margin.unit', 'px'),
      marginTop: _.get(settings, 'positioning_margin.top', '10') + _.get(settings, 'positioning_margin.unit', 'px'),
      marginBottom: _.get(settings, 'positioning_margin.bottom', '10') + _.get(settings, 'positioning_margin.unit', 'px'),
    },
  };
  if(isEditor()){
    columnElementTag = 'div';
    delete elementProps.width;
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