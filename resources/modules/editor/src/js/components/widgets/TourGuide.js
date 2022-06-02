import AltrpTour from '../altrp-tour/AltrpTour';
import isEditor from "../../../../../front-app/src/js/functions/isEditor";

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
    if (!isEditor() && this.props.element.getResponsiveSetting('steps', '', []).length === 0) {
      return <></>
    }
    let steps = this.props.element.settings.steps.map(step => ({
      selector: `.altrp-element${_.get(step, 'element')}`,
      content: _.get(step, 'text'),
      startAt: 1000
    }));
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
