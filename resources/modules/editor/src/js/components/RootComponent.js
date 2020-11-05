import React, {Component} from "react";
import { connect } from "react-redux";
import FrontElement from "../../../../front-app/src/js/classes/FrontElement";
import { setDefaultTriggers } from "../../../../front-app/src/js/store/hide-triggers/actions";


class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: props.children,
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  _componentDidMount() {
    let hiddenElementsTriggers = this.state.settings.hidden_elements_triggers;
    
    if (hiddenElementsTriggers && _.isString(hiddenElementsTriggers)) {
      hiddenElementsTriggers = hiddenElementsTriggers.split(",").map(item => item.trim());
      this.props.setDefaultTriggers(hiddenElementsTriggers);
    }
  }

  render() {
    let classes = `sections-wrapper ${this.props.element
        .getSelector()
        .replace(".", "")}`;
    let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
    return (
        <div className={classes}>{this.props.element.getSettings('test-text-4')}
            {this.state.children.map(section => (
                <ElementWrapper
                    ElementWrapper={ElementWrapper}
                    key={section.getId()}
                    component={section.componentClass}
                    element={section}
                />
            ))}
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDefaultTriggers: triggers => dispatch(setDefaultTriggers(triggers))
  }
};

export default connect(null, mapDispatchToProps)(RootComponent);

