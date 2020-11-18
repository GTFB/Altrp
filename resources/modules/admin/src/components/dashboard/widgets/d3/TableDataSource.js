import React, { Component } from "react";
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { formsStore: state.formsStore };
};
class TableDataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: props.source,
      color: props.element.settings.color,
      params: props.element.settings.params,
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

  async getData() {
    let globalParams = _.cloneDeep(this.props.formsStore.form_data, []);
    let globalParamsArray = _.keys(globalParams).map(param => {
      return { [param]: globalParams[param] };
    });
    let localParams = _.cloneDeep(this.state.params, []);
    let paramsResult = localParams.concat(globalParamsArray);
    console.log(paramsResult);
    if (typeof this.props.element.settings.source.path !== "undefined") {
      let data = {};
      if (_.keys(this.state.params).length > 0) {
        data = await new DataAdapter().adaptDataByPath(
          this.state.source.path,
          this.state.source.key,
          this.state.source.data,
          paramsResult
        );
      } else {
        data = await new DataAdapter().adaptDataByPath(
          this.state.source.path,
          this.state.source.key,
          this.state.source.data
        );
      }
      if (_.keys(data).length === 0) {
        setTimeout(() => {
          this.getData();
        }, 2500);
      }
      this.setState(s => ({ ...s, data: data }));
    }
  }

  sum(data) {
    return data.reduce((acc, item) => acc + item.data, 0);
  }

  render() {
    if (Object.keys(this.state.source).length === 0) {
      return <div>Нет данных </div>;
    }
    if (
      typeof this.state.data !== "undefined" &&
      this.state.data.length === 0
    ) {
      return <div>Нет данных</div>;
    }
    return (
      <div className="widget-table">
        <table className="vertical-table">
          <tbody>
            {this.state.data.map((item, key) => (
              <tr key={key}>
                <td>{item.key}</td>
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
