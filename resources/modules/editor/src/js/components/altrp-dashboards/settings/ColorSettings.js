import React, { Component, Suspense } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";
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
  }

  async componentWillMount() {
    await this.getData();
  }

  async getDataFromIterableDatasources(sources, paramsResult = {}) {
    return Promise.all(
      sources.map(async source => {
        let dataArray = [];
        if (_.keys(this.state.params).length > 0) {
          dataArray = await new DataAdapter().adaptDataByPath(
            source,
            paramsResult
          );
        } else {
          dataArray = await new DataAdapter().adaptDataByPath(source);
        }
        if (_.keys(dataArray).length === 0) {
          return [];
        }
        const multipleDataArray = _.uniq(
          _.sortBy(
            dataArray.map((item, index) => {
              return {
                data: item.data,
                key: item.key,
                id: index
              };
            }),
            "key"
          ),
          "key"
        );
        return {
          key: source.title || source.path,
          data: multipleDataArray
        };
      })
    );
  }

  async getData() {
    let globalParams = _.cloneDeep(this.props.formsStore.form_data, []);
    let globalParamsArray = _.keys(globalParams)
      .map(param => {
        return { [param]: globalParams[param] };
      })
      .filter(param => {
        let key = _.keys(param)[0];
        return param[key] !== "";
      });
    let localParams = _.cloneDeep(this.state.params, []);
    let paramsResult = localParams.concat(globalParamsArray);
    if (_.keys(this.props.editElement.settings.sources).length > 0) {
      let data = [];
      let isMultiple = false;
      if (_.keys(this.props.editElement.settings.sources).length === 1) {
        let source = this.props.editElement.settings.sources[0];
        if (_.keys(this.state.params).length > 0) {
          data = await new DataAdapter().adaptDataByPath(source, paramsResult);
        } else {
          data = await new DataAdapter().adaptDataByPath(source);
        }
      } else {
        data = await this.getDataFromIterableDatasources(
          this.props.editElement.settings.sources,
          paramsResult
        );
        isMultiple = true;
      }
      let needCallAgain = true;
      if (this.props.editElement.settings.sources.length > 1) {
        if (_.keys(data).length > 0) {
          let matches = data.map(obj =>
            typeof obj.data !== "undefined" ? obj.data.length > 0 : false
          );
          needCallAgain = _.includes(matches, false);
        }
      } else {
        needCallAgain =
          _.keys(data).length === 0 && this.state.countRequest < 5;
      }
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
        {this.state.isMultiple &&
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
          })}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ColorSettings);
