import React, {Component, Suspense} from "react";
import AltrpTour from '../altrp-tour/AltrpTour';
import {isEditor} from "../../../../../front-app/src/js/helpers";

class TourGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      container: document.body
    };
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
  }


  render() {
    let show = this.props.element.settings.showTutorial;

    if (!isEditor() && this.props.element.settings.steps.length === 0) {
      return <></>
    }
    console.log(this.props.element.settings.steps);
    let steps = this.props.element.settings.steps.map(step => ({
      selector: `.altrp-element${_.get(step, 'element')}`,
      content: _.get(step, 'text'),
      startAt: 1000
    }));
    console.log(steps);
    if (isEditor()) {
      show = false;
    }
    return (<>
      {isEditor() && (
          <div>Нажмите, чтобы настроить обучение</div>
      )}
      <AltrpTour show={show} steps={steps}></AltrpTour>
    </>);
  }
}

export default TourGuide