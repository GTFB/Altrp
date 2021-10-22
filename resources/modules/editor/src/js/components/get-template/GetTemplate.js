import React from "react";
import { createPortal } from "react-dom";
import {BackgroundWrapper, Content, Iframe, Wrapper} from "./GetTemplate.styled";

const marketplaceUrl = "https://altrp.org";
const url = "https://altrp.org/get/templates"

export default class GetTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.message = this.message.bind(this);
  }

  componentDidMount() {
//       const currentElement = document.getElementsByClassName(`altrp-element${this.getElement().id}`)[0];
//
//   const elementId = _.toNumber(currentElement.classList.toString().split("market-element-")[1])
//
//   const data = appStore.getState().currentDataStorage.data.templates;
//
//   for (let i = 0; i < data.length; i+1) {
//   if (data[i].id === elementId) {
//   const Http = new XMLHttpRequest();
//   const url = data[i].template_url;
//   Http.open("GET", url);
//   Http.setRequestHeader("Accept", "application/json")
//   Http.send();
//   Http.onreadystatechange=(e)=>{
//     window.parent.parent.postMessage({
//       type: "template_editor",
//       data:  e.target.response
//     }, "*")
//   }
//   break;
// }
// }
    window.addEventListener("message", this.message)
  }

  message(e) {
    console.log(e.origin)
    if(e.origin !== marketplaceUrl)
      return;
    switch (e.data.type) {
      case "template_editor":
        if(e.data.data) {
          const value = JSON.parse(e.data.data).data.children;
          altrpEditor.modules.templateDataStorage.getRootElement().setAllChild(value);
          this.props.showTemplates()
          // this.resource.postFiles([e.data.data], 'application/zip,application/x-zip,application/x-zip-compressed').then((r) => {
          //   if(r.success) {
          //     alert("installed")
          //   }
          // })
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
