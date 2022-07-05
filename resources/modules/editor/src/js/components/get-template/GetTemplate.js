import React from "react";
import { createPortal } from "react-dom";
import {BackgroundWrapper, Content, Iframe, Wrapper} from "./GetTemplate.styled";
import {getFactory} from "../../helpers";

const marketplaceUrl = "https://altrp.org";
const url = "//altrp.market/templates-frame"

export default class GetTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.message = this.message.bind(this);
  }

  componentDidMount() {
    console.log(window);
    window.addEventListener("message", this.message)
  }

  message(e) {

    if(e.origin !== marketplaceUrl)
      return;
    const data = JSON.parse(e.data)

    switch (data.type) {
      case "insert_template":
        if(data.data) {
          try {
            const value = JSON.parse(data.data);
            for(let child of value.children){
              const factory = getFactory();
              child = factory.parseData(child)
              altrpEditor.modules.templateDataStorage.getRootElement().appendChild(child);

            }
          }catch (e) {
            alert("Error parsing data")
            console.error(e);
          }
          this.props.showTemplates()
        }
        break
    }
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.message)
  }

  render() {

    const content = (
        <Wrapper>
          <Content>
            <Iframe
              src={url}
            />
          </Content>
          <BackgroundWrapper onClick={this.props.showTemplates}/>
        </Wrapper>
    )

    return createPortal(content,
      document.getElementById("editorContent").contentWindow.document.body
    )
  }
}
