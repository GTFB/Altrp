import React, { Component } from "react";

class HtmlWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
  }

  render() {
    return (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.element.getSettings()?.data
          }}
        ></div>
      </>
    );
  }
}

export default HtmlWidget;
