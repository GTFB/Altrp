import {RepeaterAdd, RepeaterContainer} from "./RepeaterStyled";
import RepeaterBlock from "./RepeaterBlock";

export default class Repeater extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <RepeaterContainer>
      {
        this.props.data.map((block, index) => {
          return (
            <RepeaterBlock
              last={this.props.data.length - 1 === index} key={block.key}
              data={block}
              content={this.props.content}
              onDelete={this.props.onDelete}
            />
          )
        })
      }
      <RepeaterAdd onClick={this.props.onAdd}>
        ADD
      </RepeaterAdd>
    </RepeaterContainer>
  }
}
