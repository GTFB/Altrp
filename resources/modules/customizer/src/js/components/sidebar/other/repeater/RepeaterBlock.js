import React from "react";
import {RepeaterBlock as Block, RepeaterBlockClose, RepeaterBlockContent, RepeaterBlockHeader} from "./RepeaterStyled";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";

export default class RepeaterBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return <Block>
      <RepeaterBlockHeader>
        <RepeaterBlockClose onClick={() => this.props.onDelete(this.props.data.key)}>
          {window.iconsManager.renderIcon('times')}
        </RepeaterBlockClose>
      </RepeaterBlockHeader>
      <RepeaterBlockContent last={this.props.last}>
        {
          React.createElement(this.props.content, {
            data: this.props.data
          })
        }
      </RepeaterBlockContent>
    </Block>
  }
}
