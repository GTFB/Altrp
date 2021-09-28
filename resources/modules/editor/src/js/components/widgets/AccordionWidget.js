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
    z-index: 4;
  }

  .altrp-accordion-item-content {
    background-color: rgb(79, 90, 114);
    color: #ffffff;
    width: 100%;
    height: 100%;
    line-height: 0;
    padding-left: 20px !important;
    padding-right: 20px !important;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    transition: 250ms ease-in-out;
    z-index: 0;
    text-align: left;
    top: -1em;
    height: 0px;
  }

  .altrp-accordion-item-content-show {
    padding: 15px 20px;
    line-height: 1;
    top: 0;
    z-index: 0;
    height: auto;
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

    const metaData = props.element.getSettings("repeater_meta_data_section", []);
    const activeItem = props.element.getSettings("active_item_additional_content", 0);
    for (let i = 0; i<metaData.length; i++) {
      if(i !== Number(activeItem - 1)) {
        this.state.activeItem.id.push(false)
      } else {
        this.state.activeItem.id.push(true)
      };
    };

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
      };
    };
  };

  render(){
    let items = this.state.settings.repeater_meta_data_section || [];
    let icon = "";
    let active_icon = "";

    if(this.state.settings.icon_accordion_content) {
      icon = renderAssetIcon(this.state.settings.icon_accordion_content,
        {className: "altrp-accordion-item-icon-svg"}
        );
    }

    if(this.state.settings.active_icon_accordion_content) {
      active_icon = renderAssetIcon(this.state.settings.active_icon_accordion_content,
        {className: "altrp-accordion-item-active-icon-svg"}
      );
    }
    const title_html_tag_accordion_content = this.props.element.getSettings('title_html_tag_accordion_content') || 'div'
    let accordion_items = items.map((item, idx) => {

      return (
        <div className={"altrp-accordion-item" + (this.state.activeItem.id[idx] ? ' active' : '')} key={idx}>
          {/*button*/}
          <div className="altrp-accordion-item-button" data-key={idx} onClick={(e) => this.open(e)}>
            <div className="altrp-accordion-item-label-container">
              {
                React.createElement(
                  title_html_tag_accordion_content,
                  {
                    className: "altrp-accordion-item-label"
                  },
                  [item.title_repeater]
                )
              }
            </div>
            {/*icon*/}
            <div className="altrp-accordion-item-icon">
              {this.state.activeItem.id[idx] ? active_icon : icon}
            </div>
          </div>
          {/*content*/}
          {
            React.createElement("div", {
              className: "altrp-accordion-item-content" + (this.state.activeItem.id[idx] ?
                  " altrp-accordion-item-content-show"
                  :
                  ""
              )
              ,
              dangerouslySetInnerHTML: {
                __html: item.wysiwyg_repeater
              },
              "data-item": idx
            })
          }
        </div>
      )
    });

    return <div className="altrp-accordion">
      {
        accordion_items
      }
    </div>
  }
}

export default AccordionWidget
