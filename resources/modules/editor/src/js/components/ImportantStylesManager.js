import {connect} from "react-redux";
import {StyleSheetManager} from "styled-components";
import ElementWrapper from "./ElementWrapper";

class ImportantStylesManager extends Component {
  componentDidMount() {
    window.importantStylesManager = this
  }

  render() {
    const {primarySections} = this.props;
    return <StyleSheetManager target={document.getElementsByClassName("important_styles")[0]}>
      <div className="important_styles_manger">
        {primarySections.map(section => {
          return <ElementWrapper
            key={`important_styles_manger${section.getId()}`}
            ElementWrapper={ElementWrapper}
            component={section.componentClass}
            element={section}
          />
        })}
        {/*<div> test</div>*/}
      </div>
    </StyleSheetManager>
  }
}

export default connect(state => ({
  primarySections: state.primarySections
}))(ImportantStylesManager)
