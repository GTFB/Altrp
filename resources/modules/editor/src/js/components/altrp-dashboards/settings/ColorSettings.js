import React, { Component, Suspense } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import DataAdapter from "../../../../../../admin/src/components/dashboard/widgets/d3/DataAdapter";
import { customStyle } from "../../../../../../admin/src/components/dashboard/widgetTypes";
import ColorPickerForFragment from "./ColorPickerForFragment";

const mapStateToProps = state => {
  return { editElement: state.editElement, formsStore: state.formsStore };
};

function mapDispatchToProps(dispatch) {
  return {
    editElementDispatch: data => dispatch(editElement(data))
  };
}

class ColorSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editElement: props.editElement,
      data: [],
      params: props.editElement.settings.params,
      countRequest: 0,
      isMultiple: false
    };
    this.getData = this.getData.bind(this);
  }

  async componentWillMount() {
    await this.getData();
  }

  async getData() {
    const {
      data,
      isMultiple,
      needCallAgain
    } = await new DataAdapter().parseData(
      this.props.editElement.settings.sources,
      this.props.formsStore.form_data,
      this.state.params,
      this.state.countRequest
    );
    if (needCallAgain) {
      setTimeout(() => {
        this.getData();
        let count = this.state.countRequest;
        count += 1;
        this.setState(s => ({ ...s, countRequest: count }));
      }, 3500);
    }
    this.setState(s => ({ ...s, data: data, isMultiple: isMultiple }));
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.editElement, this.props.editElement)) {
      this.setState(state => ({
        ...state,
        editElement: this.props.editElement
      }));
      await this.getData();
    }
  }

  render() {
    let source = this.state.editElement.settings.sources;
    if (Object.keys(source).length === 0) {

      return <div className="col-12">Нет данных </div>;
    }
    if (this.state.data.length === 0) {
      return <div className="col-12">Нет данных </div>;
    }

    let currentColor = customStyle[0] || "#606060";
    if (typeof this.props.editElement.settings.color !== "undefined") {
      let color = this.props.editElement.settings.color;
      currentColor = color;
    }
    return (
      <div className="col-12">
        <div className="mb-3">Цвет диаграммы</div>
        {this.state.isMultiple ? (
          this.state.data.map((item, index) => {
            let currentColor = customStyle[index] || "#606060";
            if (typeof this.props.editElement.settings.color !== "undefined") {
              if (
                Object.keys(this.props.editElement.settings.color).length > 0
              ) {
                let color = _.get(
                  this.props.editElement.settings.color,
                  item.key
                );
                currentColor = color;
              } else {
                currentColor = customStyle[index] || "#606060";
              }
            }
            return (
              <Form.Group
                key={index}
                className="d-flex justify-content-between"
              >
                <ColorPickerForFragment
                  index={index}
                  keyData={item.key}
                  color={currentColor}
                  setColor={this.props.setDatakeyColor}
                ></ColorPickerForFragment>
              </Form.Group>
            );
          })
        ) : (
          <div>Цвет можно указать диаграммам с множеством данных</div>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ColorSettings);
