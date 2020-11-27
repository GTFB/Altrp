import React, { Component } from "react";
import DataAdapter from "./DataAdapter";
import { connect } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";

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
    if (!_.isEqual(prevProps.sources, this.props.sources)) {
      this.setState(state => ({ ...state, sources: this.props.sources }));
      await this.getData();
    }
    if (!_.isEqual(prevProps.element, this.props.element)) {
      this.setState(state => ({
        ...state,
        legend: this.props.element.settings.legend,
        color: this.props.element.settings.color,
        sources: this.props.element.settings.sources
      }));
    }
    if (
      !_.isEqual(
        prevProps.element.settings.params,
        this.props.element.settings.params
      )
    ) {
      this.setState(state => ({
        ...state,
        params: this.props.element.settings.params
      }));
      await this.getData();
    }
    if (!_.isEqual(prevProps.element.settings, this.props.element.settings)) {
      this.setState(s => ({ ...s, settings: this.props.element.settings }));
    }
    if (
      JSON.stringify(prevProps.element.settings.params) !==
      JSON.stringify(this.props.element.settings.params)
    ) {
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
      this.setState(state => ({
        ...state,
        countRequest: 0
      }));
      await this.getData();
    }
  }

  async componentWillMount() {
    await this.getData();
  }

  async getData() {
    const {
      data,
      isMultiple,
      isDate,
      needCallAgain
    } = await new DataAdapter().parseData(
      this.props.element.settings.sources,
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
    this.setState(s => ({
      ...s,
      data: data,
      isMultiple: isMultiple,
      isDate: isDate
    }));
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
    // if (this.state.isMultiple) {
    //   return <div>Укажите только один источник данных</div>;
    // }
    if (
      typeof this.state.data !== "undefined" &&
      this.state.data.length === 0
    ) {
      if (this.state.countRequest < 5) {
        return <div>Загрузка...</div>;
      }
      return <div>Нет данных</div>;
    }
    const summary = this.state.data
      .map(item => item.data.reduce((acc, object) => acc + object.y, 0))
      .reduce((acc, item) => acc + item, 0);
    return (
      <ErrorBoundary>
        <div className="widget-table">
          <table className="vertical-table">
            <tbody>
              {this.state.data.map((item, key) => {
                const dataset = item.data.map((object, index) => (
                  <tr key={`${key}${index}`}>
                    <td>
                      {object.key instanceof Date
                        ? this.formattingDate(object.x)
                        : object.x}
                    </td>
                    <td>{object.y}</td>
                  </tr>
                ));
                return (
                  <React.Fragment key={key}>
                    <tr key={key} style={{ textAlign: "center" }}>
                      <td colSpan={2}>{item.id}</td>
                    </tr>
                    {dataset}
                  </React.Fragment>
                );
              })}
              <tr>
                <td>ИТОГО</td>
                <td>{summary}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ErrorBoundary>
    );
  }
}

export default connect(mapStateToProps)(TableDataSource);
