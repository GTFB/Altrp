import FrontPopup from "./FrontPopup";
import {connect} from "react-redux";

class AreaComponent extends Component {

  constructor(props){
    super(props);
    console.log('AreaComponent: ', performance.now());

  }
  componentWillUnmount() {

    /**
     * Перенесем все секции для ленивой подгрузки в хранилище страниц (текущая стрнаца)
     */
    // if( _.isArray(window.lazySections)){
    //   if(window.pageStorage.hasOwnProperty(page_id) ){
    //     let page = window.pageStorage[page_id];
    //
    //     window.lazySections.forEach(section => {
    //       let area = page.areas.find(area => area.id === section.area_name);
    //       if(area){
    //         section.element.lazySection = true;
    //         area.template.data.children.push(section.element)
    //       }
    //     });
    //   }
    //   window.lazySections = null;
    // }

    if(window.pageUpdater){
      window.pageUpdater.startUpdating();
    }
    window.stylesModule.removeStyleById(this.rootElement?.id);
  }

  render() {
    let classes = [`app-area`, `app-area_${this.props.id}`];
    /**
     * Если это попап
     */
    if (this.props.area.getTemplates().length) {
      let popus =  (
        <div className={classes.join(" ")}>
          {this.props.area.getTemplates().map(template => {
            return (
              <FrontPopup key={template.id} template={template} />
            )
          })}
        </div>
      );
      return popus;
    }
    /**
     * Если шаблон привязанный к странице удалили, то ничего не отрисовываем
     */
    if (! this.props.template.data) {
      return <div className={classes.join(" ")} />;
    }
    let rootElement = this.rootElement ? this.rootElement : window.frontElementsFabric.parseData(
      this.props.template.data,
      null,
      this.props.page,
      this.props.models
    );
    this.rootElement = rootElement;
    window[`${this.props.id}_root_element`] = this.rootElement;
    if(this.props.scrollPosition.top > 0){
      this.rootElement.children.forEach(section => {
        section.lazySection = false
      });

    }
    let {children} = this.rootElement;
    children = children.filter(child => ! child.lazySection);
    let template =  (
      <div className={classes.join(" ")}>
        {React.createElement(this.rootElement.componentClass, {
          element: this.rootElement,
          children,
        })}
      </div>
    );
    return template;
  }
}

function mapStateToProps(state) {
  return {
    scrollPosition: state.scrollPosition,
  };
}

export default connect(mapStateToProps)(AreaComponent);
