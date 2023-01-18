import {connect} from "react-redux";
import {StyleSheetManager, createGlobalStyle} from "styled-components";
import ElementWrapper from "./ElementWrapper";
import RootComponentContext from "../Contexts/RootComponentContext";

const GlobalDefaults = createGlobalStyle`
${()=>{
  return window.globalDefaults.join('')
}}
`

class ImportantStylesManager extends Component {
  componentDidMount() {
    window.importantStylesManager = this
  }

  render() {
    const {primarySections} = this.props;
    return <StyleSheetManager target={document.getElementsByClassName("important_styles")[0]}>
      <RootComponentContext.Provider value={{isImportantStylesModule:true}}>
      <div className="important_styles_manger">
        <GlobalDefaults />
        {primarySections.map(section => {
          return <ElementWrapper
            key={`important_styles_manger${section.getId()}`}
            ElementWrapper={ElementWrapper}
            isTemplateStylesModule={true}
            component={section.componentClass}
            element={section}
          />
        })}
      </div>
      </RootComponentContext.Provider>
    </StyleSheetManager>
  }
}



export default connect(state => ({
  primarySections: state.primarySections
}))(ImportantStylesManager)
