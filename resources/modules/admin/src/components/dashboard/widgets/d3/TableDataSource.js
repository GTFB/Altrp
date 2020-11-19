import React, { Component } from "react";
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";
import { connect } from "react-redux";
import ErrorBoundaty from "./ErrorBoundary";

const mapStateToProps = state => {
  return { formsStore: state.formsStore };
};
class TableDataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: props.sources,
      color: props.element.settings.color,
      params: props.element.settings.params,
      countRequest: 0,
      isMultiple: false,
      data: []
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.source, this.props.source)) {
      this.setState(state => ({ ...state, source: this.props.source }));
    }
    if (!_.isEqual(prevProps.element, this.props.element)) {
      this.setState(state => ({
        ...state,
        color: this.props.element.settings.color,
        params: this.props.element.settings.params
      }));

      await this.getData();
    }
    if (
      JSON.stringify(prevState.params) !==
      JSON.stringify(this.props.element.settings.params)
    ) {
      console.log("CHANGE IN BAR");
      this.setState(state => ({
        ...state,
        params: this.props.element.settings.params
      }));
      await this.getData();
    }
    if (
      !_.isEqual(
        prevProps.formsStore.form_data,
        this.props.formsStore.form_data
      )
    ) {
      await this.getData();
    }
  }

  async componentWillMount() {
    await this.getData();
  }

  formattingDate(data) {
    return new Date(data).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
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
        const multipleDataArray = _.sortBy(
          dataArray.map((item, index) => {
            return {
              data: item.data,
              key: item.key,
              id: index
            };
          }),
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
    let isMultiple = false;
    if (_.keys(this.props.element.settings.sources).length > 0) {
      let data = [];
      if (_.keys(this.props.element.settings.sources).length === 1) {
        let source = this.props.element.settings.sources[0];
        if (_.keys(this.state.params).length > 0) {
          data = await new DataAdapter().adaptDataByPath(source, paramsResult);
        } else {
          data = await new DataAdapter().adaptDataByPath(source);
        }
      } else {
        data = await this.getDataFromIterableDatasources(
          this.props.element.settings.sources,
          paramsResult
        );
        isMultiple = true;
      }
      let needCallAgain = true;
      if (this.props.element.settings.sources.length > 1) {
        let matches = data.map(obj => obj.data.length > 0);
        needCallAgain = _.includes(matches, false);
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

  sum(data) {
    return data.reduce((acc, item) => acc + item.data, 0);
  }

  render() {
    if (
      typeof this.state.sources === "undefined" ||
      Object.keys(this.state.sources).length === 0
    ) {
      return <div>Нет данных </div>;
    }
    if (this.state.isMultiple) {
      return <div>Укажите только один источник данных</div>;
    }
    if (
      typeof this.state.data !== "undefined" &&
      this.state.data.length === 0
    ) {
      if (this.state.countRequest < 5) {
        return <div>Загрузка...</div>;
      }
      return <div>Нет данных</div>;
    }

    return (
      <ErrorBoundaty>
        <div className="widget-table">
          <table className="vertical-table">
            <tbody>
              {this.state.data.map((item, key) => (
                <tr key={key}>
                  <td>
                    {item.key instanceof Date
                      ? this.formattingDate(item.key)
                      : item.key}
                  </td>
                  <td>{item.data}</td>
                </tr>
              ))}
              <tr>
                <td>ИТОГО</td>
                <td>{this.sum(this.state.data)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ErrorBoundaty>
      // <div className="widget-table">
      //       <table>
      //             <thead>
      //                   <tr>
      //                         {data.map((item, key) => (
      //                               <th key={key}>{item.key}</th>
      //                         ))}
      //                         <th>ИТОГО</th>
      //                   </tr>
      //             </thead>
      //             <tbody>
      //                   <tr>
      //                         {data.map((item, key) => (
      //                               <td key={key}>{item.data}</td>
      //                         ))}
      //                         <td>{this.sum(data)}</td>
      //                   </tr>
      //             </tbody>
      //       </table>
      // </div>
    );
  }
}

export default connect(mapStateToProps)(TableDataSource);
