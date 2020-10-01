import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";

class FrontPopup extends Component {
  state = {
    isVisible: false,
    isShownOnScroll: false
  }

  // componentDidMount() {
  //   const { on_page_load, on_click } = _.get(this.props, 'template.triggers.data', {});

  //   if (on_page_load) {
  //     setTimeout(() => this.setState({ isVisible: true }), on_page_load * 1000)
  //   }

  //   if (on_click) {
  //     this.clickCounter = 0;
  //     document.addEventListener('click', () => {
  //       this.clickCounter += 1;
  //       if (this.clickCounter === +on_click) {
  //         this.clickCounter = 0;
  //         this.setState({ isVisible: true });
  //       }
  //     })
  //   }
  // }

  // componentDidUpdate() {
  //   const { on_scroll } = this.props.template.triggers.data;
  //   const { isShownOnScroll } = this.state;

  //   if (on_scroll && !isShownOnScroll && on_scroll.size <= this.props.topPosition * 100) {
  //     this.setState({ isVisible: true, isShownOnScroll: true });
  //   }
  // }

  render() {
    const { isVisible } = this.state;
    let classes = [`app-popup`];

    let rootElement = window.frontElementsFabric.parseData(this.props.template.data, null, this.props.page, this.props.models);
    return isVisible ? <div className={classes.join(' ')}>
      <button className="popup-close-button" onClick={() => this.setState({ isVisible: false })}>✖</button>
      {React.createElement(rootElement.componentClass,
        {
          element: rootElement,
          children: rootElement.children
        })}
    </div> : null
  }
}

const mapStateToProps = state => {
  return {
    topPosition: state.scrollPosition.top
  }
};

export default connect(mapStateToProps)(FrontPopup);
