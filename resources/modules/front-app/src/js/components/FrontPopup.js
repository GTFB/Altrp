import React, { Component } from "react";

class FrontPopup extends Component {
  state = {
    isVisible: false
  }

  componentDidMount() {
    const { on_page_load, on_click } = this.props.template.triggers.data;

    // if (on_page_load) {
    //   setTimeout(() => this.setState({ isVisible: true }), on_page_load * 1000)
    // }

    if (on_click) {
      this.clickCounter = 0;
      document.addEventListener('click', () => {
        this.clickCounter += 1;
        if (this.clickCounter === +on_click) {
          this.clickCounter = 0;
          this.setState({ isVisible: true });
        }
      })
    }
  }

  render() {
    const { isVisible } = this.state;
    let classes = [`app-popup`];

    let rootElement = window.frontElementsFabric.parseData(this.props.template.data, null, this.props.page, this.props.models);
    return isVisible ? <div className={classes.join(' ')}>
      {React.createElement(rootElement.componentClass,
        {
          element: rootElement,
          children: rootElement.children
        })}
    </div> : null
  }
}

export default FrontPopup