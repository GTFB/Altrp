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
import NewSectionStructure from "../NewSectionStructure";

const marketplaceUrl = "https://altrp.org";
const url = "https://altrp.org/get/templates/section"

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
