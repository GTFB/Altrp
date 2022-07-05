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
import NewSectionStructure from "../NewSectionStructure";


export default class GetSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      showSections: false
    }

  }


  componentWillUnmount() {
    window.removeEventListener("message", this.message)
  }
  render() {


    const content = (
        <Wrapper>
          <Content>
            <NewSectionStructure toggleSection={this.props.toggleSection}/>
          </Content>
          <BackgroundWrapper onClick={this.props.toggleSection}/>
        </Wrapper>
    )

    return createPortal(content,
      document.getElementById("editorContent").contentWindow.document.body
    )
  }
}
