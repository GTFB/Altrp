import React, {Component} from "react";

class AccordionWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    this.open = this.open.bind(this);
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }

    this.items_content = React.createRef()
  }

  // componentDidMount() {
  //   let number_item = this.state.settings.active_item_additional_content
  //   if(this.items_content.current.children[Number(number_item)-1]) {
  //     this.items_content.current.children[Number(number_item)-1].lastChild.classList.add("altrp-accordion-item-content-show")
  //   }
  // }

  open(e) {
    let target = e.currentTarget;

    if(!this.state.settings.multiple_additional_content) {
      let items = target.parentNode.parentNode.children;
      for(let i=0; i<items.length; i++) {
        if(i != target.parentNode.lastChild.dataset.item) {
          items[i].lastChild.classList.remove("altrp-accordion-item-content-show");
        };
      };
    };

    target.parentNode.lastChild.classList.toggle("altrp-accordion-item-content-show");
  }

  render(){
    let items = this.state.settings.repeater_accordion_content || []

    let accordion_items = items.map((item, idx) => {
      return (
        <div className="altrp-accordion-item" key={idx}>
          {/*button*/}
          <div className="altrp-accordion-item-button" onClick={this.open}>
            <div className="altrp-accordion-item-label">
              {item.title_repeater}
            </div>
            <div className="altrp-accordion-item-icon">
              icon
            </div>
          </div>
          {/*content*/}
          {
            React.createElement("div", {
              className: "altrp-accordion-item-content",
              dangerouslySetInnerHTML: {
                __html: item.wysiwyg_repeater
              },
              "data-item": idx
            })
          }
        </div>
      )
    });

    return <div className="altrp-accordion" ref={this.items_content}>
      {
        accordion_items
      }
    </div>
  }
}

export default AccordionWidget
