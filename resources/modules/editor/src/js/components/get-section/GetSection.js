import React from "react";
import { createPortal } from "react-dom";
import {BackgroundWrapper, Content, ContentWithSections, Iframe, ReturnButton, Wrapper} from "./GetSection.styled";
import {getFactory, iconsManager} from "../../helpers"

const marketplaceUrl = "https://altrp.org";
const url = "https://altrp.org/get/templates/section"

export default class GetSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      showSections: false
    }

    this.message = this.message.bind(this);
    this.returnToIframe = this.returnToIframe.bind(this);
  }

  componentDidMount() {
    // const currentElement = document.getElementsByClassName(`altrp-element${this.getElement().id}`)[0];
    //
    // const elementId = _.toNumber(currentElement.classList.toString().split("market-element-")[1])
    //
    // const data = appStore.getState().currentDataStorage.data.templates;
    //
    // for (let i = 0; i < data.length; i+1) {
    //   if (data[i].id === elementId) {
    //     const Http = new XMLHttpRequest();
    //     const url = data[i].template_url;
    //     Http.open("GET", url);
    //     Http.setRequestHeader("Accept", "application/json")
    //     Http.send();
    //     Http.onload=(e)=>{
    //       window.parent.parent.postMessage({
    //         type: "section_editor",
    //         data:  e.target.response
    //       }, "*")
    //     }
    //     break;
    //   }
    // }
    window.addEventListener("message", this.message)
  }

  message(e) {
    console.log(e.origin)
    if(e.origin !== marketplaceUrl)
      return;
    switch (e.data.type) {
      case "section_editor":
        if(e.data.data) {
          const value = JSON.parse(e.data.data).data.children;
          console.log(value)
          const factory = getFactory();

          const sections = [];

          value.forEach(section => {
            sections.push(factory.parseData(section))
          })

          this.setState({ showSections: true, sections })
        }
        break
    }
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.message)
  }
  returnToIframe() {
    this.setState({ showSections: false })
  }

  render() {

    const ReturnIcon = iconsManager().getIconComponent("exit");
    const ElementWrapper = window.ElementWrapper

    const content = (
        <Wrapper>
          <Content>
            <Iframe
              src={url}
              showSections={this.state.showSections}
            />

            <ContentWithSections showSections={this.state.showSections}>
              <ReturnButton onClick={this.returnToIframe}>
                <ReturnIcon/>
              </ReturnButton>
              <div>
                { this.state.sections.length > 0 && this.state.sections.map(section => {
                  return(
                    <ElementWrapper
                      ElementWrapper={ElementWrapper}
                      rootElement={altrpEditor.modules.templateDataStorage.getRootElement()}
                      key={section.getIdForAction()}
                      component={section.componentClass}
                      element={section}
                    />
                  )})
                }
              </div>
            </ContentWithSections>
          </Content>
          <BackgroundWrapper onClick={this.props.showSections}/>
        </Wrapper>
    )

    return createPortal(content,
      document.getElementById("editorContent").contentWindow.document.body
    )
  }
}
