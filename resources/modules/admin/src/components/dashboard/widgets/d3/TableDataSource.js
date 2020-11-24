import React, { Component } from "react";
import DataAdapter from "./DataAdapter";
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

  formattingDate(data) {
    return new Date(data).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
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
    );
  }
}

export default connect(mapStateToProps)(TableDataSource);
