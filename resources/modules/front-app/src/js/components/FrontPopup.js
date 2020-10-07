import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
// import { isElementTopInViewport, getTopPosition } from "../helpers";

class FrontPopup extends Component {
  state = {
    isVisible: false,
    isShownOnScroll: false
  }

  componentDidMount() {
    const { on_page_load, on_click, inactivity, on_exit, to_element } = _.get(this.props, 'template.triggers.data', {});

    if (on_page_load || on_page_load === 0) {
      setTimeout(() => this.setState({ isVisible: true }), on_page_load * 1000)
    }

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

    if (inactivity) {
      this.inactivityTimeout = setTimeout(() => this.setState({ isVisible: true }), inactivity * 1000);

      this.resetTimer = () => {
        clearTimeout(this.inactivityTimeout);
        this.inactivityTimeout = setTimeout(() => this.setState({ isVisible: true }), inactivity * 1000);
      }

      const events = ['mousedown', 'keydown', 'touchstart'];
      events.forEach(event => {
        document.addEventListener(event, this.resetTimer, true);
      });
    }

    if (on_exit) {
      // window.addEventListener('beforeunload', (event) => {
      //   // Отмените событие, как указано в стандарте.
      //   event.preventDefault();
      //   this.setState({ isVisible: true })
      //   // Хром требует установки возвратного значения.
      //   event.returnValue = '';
      // });
      document.addEventListener('mouseleave', () => this.setState({ isVisible: true }))
    }

    // if (to_element) {
    //   const htmlCollection = document.getElementsByClassName(to_element);
    //   console.log(htmlCollection);
    //   this.elements = []
    //   for (let index = 0; index < htmlCollection.length; index++) {
    //     const element = htmlCollection[index];
    //     this.elements[index] = getTopPosition(element);
    //   }
    //   console.log(this.elements);
    // }
  }

  componentDidUpdate(prevProps) {
    const { on_scroll, to_element } = _.get(this.props, 'template.triggers.data');
    const { isShownOnScroll } = this.state;

    if (on_scroll && !isShownOnScroll && on_scroll.size <= this.props.scrollPosition.top * 100) {
      this.setState({ isVisible: true, isShownOnScroll: true });
    }

    if (this.resetTimer && this.props.scrollPosition.top !== prevProps.scrollPosition.top) {
      this.resetTimer();
    }

    // if (to_element && this.props.scrollPosition.top !== prevProps.scrollPosition.top) {
    //   // console.log(this.elements)
    //   console.log(this.props.scrollPosition.scrollTop)
    //   const { scrollTop, clientHeight } = this.props.scrollPosition;

    //   for (let index = 0; index < this.elements.length; index++) {
    //     const element = this.elements[index];

    //     if (isElementTopInViewport(element, scrollTop, clientHeight)) {
    //       this.setState({ isVisible: true });
    //       // this.elements.splice(index, 1);
    //     }
    //   }

    // }

  }

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
    scrollPosition: state.scrollPosition
  }
};

export default connect(mapStateToProps)(FrontPopup);
