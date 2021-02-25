import {isEditor} from "../../../../../front-app/src/js/helpers";

/**
 * Возвращает шаблон секции для письма
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
 */
export default function sectionElementEmailRender(){
  const settings = this.props.element.getSettings();

  let sectionElementTag;
  sectionElementTag = 'tr';
  const elementProps = {
    style: {
      paddingLeft: _.get(settings, 'position_style_position_padding.left', '10') + _.get(settings, 'position_style_position_padding.unit', 'px'),
      paddingRight: _.get(settings, 'position_style_position_padding.right', '10') + _.get(settings, 'position_style_position_padding.unit', 'px'),
      paddingTop: _.get(settings, 'position_style_position_padding.top', '10') + _.get(settings, 'position_style_position_padding.unit', 'px'),
      paddingBottom: _.get(settings, 'position_style_position_padding.bottom', '10') + _.get(settings, 'position_style_position_padding.unit', 'px'),
      backgroundColor: _.get(settings, 'section_style_background_color.colorPickedHex', ''),
    },
  };
  if(isEditor()){
    sectionElementTag = 'div';
    elementProps.className = 'altrp-section';
  }
  let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
  let columns = this.state.children.map(column => {
        let columnContent = <ElementWrapper
            ElementWrapper={ElementWrapper}
            key={column.getId()}
            component={column.componentClass}
            baseRender={this.props.baseRender}
            element={column}
        />;
        return columnContent;
      }

  );
  if(! isEditor()){
    columns =
        <td style={elementProps.style}><table width="100%"><tbody><tr>{columns}</tr></tbody></table></td>;
  }
  return React.createElement(sectionElementTag, elementProps, columns);
}