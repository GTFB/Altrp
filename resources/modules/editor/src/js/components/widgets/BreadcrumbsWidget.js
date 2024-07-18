import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";
import getBreadcrumbsItems from "../../../../../front-app/src/js/functions/getBreadcrumbsItems";
import getResponsiveSetting from "../../../../../front-app/src/js/functions/getResponsiveSetting";
import {typographicControllerToStyles} from "../../../../../front-app/src/js/helpers/styles";
import {Breadcrumb, Breadcrumbs} from "@blueprintjs/core";

const GlobalStyles = createGlobalStyle`
  ${({elementId, settings})=>{
    let styles = `.altrp-portal.altrp-portal${elementId}{`;

    styles += `.bp3-menu-item:not(.bp3-disabled){`;

    let color = getResponsiveSetting(settings, 'color');

    if(color && color.color){
      styles += `color:${color.color};`;
    }
    let font = getResponsiveSetting(settings, 'font');
    if(font){
      styles += typographicControllerToStyles(font);
    }
    styles += `}`;
    styles += `.bp3-menu-item:not(.bp3-disabled):hover{`;

    color = getResponsiveSetting(settings, 'color', ':hover');

    if(color && color.color){
      styles += `color:${color.color};`;
    }
    font = getResponsiveSetting(settings, 'font', ':hover');

    if(font){
      styles += typographicControllerToStyles(font);
    }
    styles += `}`;


    styles += `.bp3-menu-item.bp3-disabled{`;

    let current_color = getResponsiveSetting(settings, 'current_color');

    if(current_color && current_color.color){
      styles += `color:${current_color.color};`;
    }

    let current_font = getResponsiveSetting(settings, 'current_font');

    if(current_font){
      styles += typographicControllerToStyles(current_font);
    }

    styles += `}`;

    styles += '}';

    return styles
  }}
`;

class BreadcrumbsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      pending: false,
      key: 1,
    };
    this.element = props.element;
    this.elementId = props.element.getId();
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
  }

  /**
   * @return {[]}
   */
  getBreadcrumbsItems(){
    let data  =[];
    if(isEditor()){
      data = [
        {
          href: '#',
          icon: 'folder-close',
          text: 'Main',
        },
        {
          href: '#',
          icon: 'derive-column',
          text: 'Second Item',
        },
        {
          icon: 'endorsed',
          text: 'Last Item',
        },
      ];
    } else {
      data = getBreadcrumbsItems()

      data = data.map((item, idx) =>{
        let m_override = this.props.element.getSettings('m_override')
        let text = replaceContentWithData(item.title, this.props.element.getCurrentModel())
        if(m_override && idx === 0){
          text = replaceContentWithData(m_override  , this.props.element.getCurrentModel())
        }
        const newItem = {
          text,
        };
        if(item.icon){
          newItem.icon = <span className="altrp-menu-item__icon bp3-icon" dangerouslySetInnerHTML={{__html: item.icon}}/>
        }
        if(idx + 1 < data.length){
          newItem.href = item.path
        }
        return newItem;
      });
    }
    return  data;
  }
  breadcrumbRenderer=(props)=>{
    delete props.onClick
    return <Breadcrumb {...props}/>
  }
  currentBreadcrumbRenderer=(props)=>{

    props.current = true
    delete props.onClick
    return <Breadcrumb   {...props} />
  }
  onDOMContentLoaded=()=>{
    this.setState({
      key: Math.random()
    })
  }
  render() {
    const breadcrumbsProps = {
      items: this.getBreadcrumbsItems(),
      collapseFrom: this.element.getResponsiveLockedSetting('collapse') || 'start',
      popoverProps: {
        portalClassName: `altrp-portal altrp-portal${this.elementId}`,
      },
      breadcrumbRenderer: this.breadcrumbRenderer,
      currentBreadcrumbRenderer: this.currentBreadcrumbRenderer,
    };
    return <>
      <GlobalStyles settings={this.element.getSettings()} elementId={this.elementId}/>
      <Breadcrumbs {...breadcrumbsProps} key={this.state.key}/>
    </>;
  }
}

export default BreadcrumbsWidget;
