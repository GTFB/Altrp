import { Component } from "react";
import { connect } from "react-redux";
import PaddingTooltipInput from "./PaddingTooltipInput";

const mapStateToProps = state => {
  return { editElement: _.cloneDeep(state.editElement) };
};

function mapDispatchToProps(dispatch) {
  return {
    editElementDispatch: data => dispatch(editElement(data))
  };
}

class TooltipSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editElement: props.editElement
    };
    this.setTooltipEnable = this.setTooltipEnable.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.editElement, this.props.editElement)) {
      this.setState(s => ({ ...s, editElement: this.props.editElement }));
    }
  }

  setTooltipEnable(e) {
    this.props.setProperty(e.target.checked, "enableCustomTooltip");
  }

  render() {
    return (
      <>
        <div className="col">
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Отобразить собственные подсказки
            </div>
            <input
              type="checkbox"
              defaultChecked={
                this.state.editElement?.settings?.enableCustomTooltip
              }
              checked={this.state.editElement?.settings?.enableCustomTooltip}
              onChange={this.setTooltipEnable}
            />
          </div>
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Отступы внутри подсказки
            </div>
            <PaddingTooltipInput
              widgetID={this.props.widgetID}
              setProperty={this.props.setProperty}
              padding={this.state.editElement?.settings?.tooltip?.padding}
            />
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TooltipSettings);
