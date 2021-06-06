import React, {Component} from "react";
const AltrpTemplate = React.lazy(() => import ('../altrp-template/AltrpTemplate'));

class TemplateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateGUID: this.element.getSettings('template'),
    };
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
  }

  render() {
    return <React.Suspense fallback={''}>
      <AltrpTemplate settings={this.element.getSettings() || {}}/>
    </React.Suspense>
  }
}

export default TemplateWidget
