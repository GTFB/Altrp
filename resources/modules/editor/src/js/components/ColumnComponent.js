import getDataByPath from "../../../../front-app/src/js/functions/getDataByPath"
import isEditor from "../../../../front-app/src/js/functions/isEditor"
import redirect from "../../../../front-app/src/js/functions/redirect"

(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-column {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    align-content: flex-start;
  }
`);

class ColumnComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: props.children || [],
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
    this.columnCount = 0
    this.element = this.props.element
  }

  /**
   * Обрабатываем клик по секции
   * @param e
   */
  onClick = (e) => {
    if (isEditor()) {
      return;
    }
    const columnLink = this.props.element.getLockedSettings('link_link');
    redirect(columnLink, e, this.props.element.getCurrentModel().getData());
  };

  /**
   * Курсор для ссылки
   * @return {boolean}
   */
  columnIsLink() {
    return !!_.get(this, 'props.element.settings.link_link.url');
  }

  getStyles = ()=>{
    const styles = {}
    let path_image = this.element.getSettings('path_image')
    if(path_image){
      path_image = getDataByPath(path_image, this.element.getCardModel())
    }
    if(path_image){
      styles.backgroundImage = `url("${path_image}")`
    }
    return styles
  }

  render() {
    const background_image = this.props.element.getLockedSettings('background_image', {});
    const background_image_hover = this.props.element.getResponsiveLockedSetting(
      "background_image",
      ":hover",
      {},
    );
    let ElementWrapper = window.SectionElementWrapper || this.props.ElementWrapper || window.ElementWrapper;
    let className = "altrp-column altrp-column-priority " + (this.state.settings.position_style_css_classes_column || "") + (background_image?.url || background_image_hover?.url ? ' altrp-background-image-columns' : '');
    if (this.isActive()) {
      className += ' active';
    }
    if (this.columnIsLink()) {
      className += ' altrp-pointer';
    }

    const layout_html_tag = this.props.element.getLockedSettings('layout_html_tag') || 'div';

    return React.createElement(layout_html_tag,
      {
        style:this.getStyles(),
        className,
        id: this.state.settings.position_style_css_id_column || "",
        onClick: this.onClick,
      },
      this.state.children.map(
        widget => {

          return <ElementWrapper key={widget.getIdForAction()}
                                 rootElement={this.props.rootElement}
                                 baseRender={this.props.baseRender}
                                 ElementWrapper={ElementWrapper}
                                 component={widget.componentClass}
                                 element={widget}/>
        }
      )
    );
  }
}

export default ColumnComponent
