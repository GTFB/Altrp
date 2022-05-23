import AccordionItem from "./AccordionItem";

const {renderAssetIcon} = window.altrpHelpers;

(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-accordion-item-button {
    background-color: rgb(52, 59, 76);
    color: #ffffff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    cursor: pointer;
    width: 100%;
    padding: 15px 20px;
    transition: 450ms ease-in-out;
    z-index: 4;
  }

  .altrp-accordion-item-label {
    transition: 450ms ease-in-out;
  }

  .altrp-accordion-item-content {
    background-color: rgb(79, 90, 114);
    color: #ffffff;
    position: relative;
    width: 100%;
    transition: 450ms ease-in-out, visibility 450ms ease-in-out;
    z-index: 0;
    text-align: left;
    visibility: hidden;
  }

  .active .altrp-accordion-item-content {
    display: block;
    visibility: visible;
  }

  .altrp-accordion-item-content-text {
    width: 100%;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    line-height: 1.5;
    font-size: 16px;
    padding: 30px 20px;
    transition: 450ms ease-in-out;
  }

  .altrp-accordion-item-content * {
    margin: 0;
  }

  .altrp-accordion-item-label-container {
    width: 100%;
    height: 100%;
    position: relative;
    margin-right: auto;
  }

  .altrp-accordion-item:first-child {
    margin-top: 0px !important;
  }

  .altrp-accordion-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .altrp-accordion-item-icon svg {
    width: 16px;
    height: 16px;
  }
`);

class AccordionWidget extends Component {
  constructor(props){
    super(props);
    let settings = props.element.getSettings();
    this.state = {
      settings: settings,
      activeItem: {
        id: [],
      }
    };

    const metaData = props.element.getLockedSettings("repeater_meta_data_section", []);
    const activeItem = props.element.getLockedSettings("active_item_additional_content", 0);
    for (let i = 0; i<metaData.length; i++) {
      if(i !== Number(activeItem - 1)) {
        this.state.activeItem.id.push(false)
      } else {
        this.state.activeItem.id.push(true)
      }

    }


    this.open = this.open.bind(this);
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }

  }

  open(e) {
    let activeItem = Number(e.currentTarget.dataset.key) || 0;

    if(!this.state.settings.multiple_additional_content) {
      for (let i = 0; i<this.state.activeItem.id.length; i++) {
        if (i === activeItem) {
          this.setState((state) => {
            state.activeItem.id[activeItem] = !state.activeItem.id[activeItem];
            return {
              ...state
            };
          });
        } else {
          this.setState((state) => {
            state.activeItem.id[i] = false;
            return {
              ...state
            };
          });
        }
      }
    } else {
      this.setState((state) => {
        state.activeItem.id[activeItem] = !state.activeItem.id[activeItem];
        return {
          ...state
      };
      });
    }
  };


  /**
   * Получить css классы для accordion widget
   */
  getClasses = ()=>{
    let classes = ``;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render(){
    let items = this.state.settings.repeater_meta_data_section || [];
    let icon = "";
    let active_icon = "";
    let classes =
      this.getClasses() + (this.state.settings.position_css_classes || "")

    if(this.state.settings.icon_accordion_content) {
      icon = renderAssetIcon(this.state.settings.icon_accordion_content,
        {className: `${classes} altrp-accordion-item-icon-svg`}
        );
    }

    if(this.state.settings.active_icon_accordion_content) {
      active_icon = renderAssetIcon(this.state.settings.active_icon_accordion_content,
        {className: `${classes} altrp-accordion-item-active-icon-svg`}
      );
    }
    const title_html_tag_accordion_content = this.props.element.getLockedSettings('title_html_tag_accordion_content') || 'div'

    return <div className={`${classes} altrp-accordion`}>
      {
        items.map((item, idx) => (
          <AccordionItem
            idArray={this.state.activeItem.id}
            idx={idx}
            open={(e) => this.open(e)}
            item={item}
            key={idx}
            title_html_tag_accordion_content={title_html_tag_accordion_content}
            icon={icon}
            activeIcon={active_icon}
            activeMode={this.state.activeItem.id[idx]}
          />
        ))
      }
    </div>
  }
}

export default AccordionWidget
