import React from "react";
import styled from "styled-components";
import axios from "axios";
import Resource from "../../../editor/src/js/classes/Resource";

const Wrapper = styled.div`
  height: calc(100vh - 62px);
  margin-top: 62px;
  width: calc(100vw - 271px);
  display: flex;
  justify-content: stretch;
`

const marketplaceUrl = "https://altrp.market";

class Marketplace extends React.Component {
  constructor(props) {
    super(props);

    this.iframeRef = React.createRef();
    this.resource = new Resource({route:'/admin/ajax/import/settings'});
  }

  componentDidMount() {

    // const Http = new XMLHttpRequest();
    // const url = appStore.getState().currentDataStorage.data.template.template_url;
    // Http.open("GET", url);
    // Http.responseType = "blob"
    // Http.setRequestHeader("Accept", "application/zip,application/x-zip,application/x-zip-compressed")
    // Http.send();
    // Http.onreadystatechange=(e)=>{
    //   window.parent.postMessage({
    //     type: "template_download",
    //     data:  e.target.response
    //   }, "*")
    // }

    window.addEventListener("message", (e) => {
      if(e.origin !== marketplaceUrl)
        return;
      switch (e.data.type) {
        case "template_download":
          if(e.data.data) {
            this.resource.postFiles([e.data.data], 'application/zip,application/x-zip,application/x-zip-compressed').then((r) => {
              if(r.success) {
                alert("installed")
              }
            })
          }
          break
      }
    })
  }

  render() {

    return <Wrapper>
      <iframe
        width="100%"
        ref={this.iframeRef}
        src={marketplaceUrl}
      />
    </Wrapper>
  }
}

export default Marketplace
