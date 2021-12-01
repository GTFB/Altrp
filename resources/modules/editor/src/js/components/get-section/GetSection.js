import React from "react";
import { createPortal } from "react-dom";
import {
  BackgroundWrapper,
  Content,
  ContentSections,
  ContentWithSections, Element,
  Iframe, Overlap,
  ReturnButton, ViewElement,
  Wrapper
} from "./GetSection.styled";
import {getFactory, iconsManager} from "../../helpers"
import Scrollbars from "react-custom-scrollbars";

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

    this.rootElement = altrpEditor.modules.templateDataStorage.getRootElement();
  }

  componentDidMount() {
   // const elements =  document.getElementsByClassName(`market-element`);
   //
   //  for (let element of elements) {
   //    element.addEventListener("click", (e) => {
   //      const elementId = _.toNumber(e.currentTarget.classList.toString().split("market-element-")[1])
   //
   //      const data = appStore.getState().currentDataStorage.data.templates;
   //
   //      for (let dataElem of data) {
   //        if (dataElem.id === elementId) {
   //
   //          const Http = new XMLHttpRequest();
   //          const url = dataElem.template_url;
   //          Http.open("GET", url);
   //          Http.setRequestHeader("Accept", "application/json")
   //          Http.send();
   //          Http.onload=(e)=>{
   //            window.parent.parent.postMessage({
   //              type: "section_editor",
   //              data:  e.target.response
   //            }, "*")
   //          }
   //          break;
   //        }
   //      }
   //    })
   //  }

    window.addEventListener("message", this.message)
  }

  message(e) {
    console.log(e.origin, e)
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
            sections.push(factory.parseData(section, null, null, {
              updateId: true
            }))
          })
          this.setState({ showSections: true, sections })
        }
        break
    }
  }

  addSection(idx) {
    console.log(idx)
    this.rootElement.appendChild(this.state.sections[idx]);
    this.props.showSections()
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.message)
  }
  returnToIframe() {
    this.setState({ showSections: false })
  }

  render() {

    const Arrow = iconsManager().getIconComponent("arrow");
    const ElementWrapper = window.ElementWrapper

    const content = (
        <Wrapper>
          <Content>
            <Iframe
              src={url}
              showSections={this.state.showSections}
            />
            <ContentWithSections showSections={this.state.showSections}>
              {
                this.state.sections.length > 0 && <>
                  <ReturnButton onClick={this.returnToIframe}>
                    <Arrow/>
                  </ReturnButton>
                  <Scrollbars>
                    <ContentSections>

                      {
                        this.state.sections.map((section, idx) => {
                          return(
                            <Element
                              onClick={() => this.addSection(idx)}
                              key={section.getIdForAction()}
                            >
                              <ViewElement>
                                <ElementWrapper
                                  ElementWrapper={ElementWrapper}
                                  rootElement={altrpEditor.modules.templateDataStorage.getRootElement()}
                                  component={section.componentClass}
                                  element={section}
                                />
                              </ViewElement>
                              <Overlap/>
                            </Element>

                          )})
                      }
                    </ContentSections>
                  </Scrollbars>
                </>
              }
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
