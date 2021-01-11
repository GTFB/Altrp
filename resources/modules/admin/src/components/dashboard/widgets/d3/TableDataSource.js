import React, { Component } from "react";
import DataAdapter from "./DataAdapter";
import { connect } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";

const mapStateToProps = state => {
  return { formsStore: _.cloneDeep(state.formsStore) };
};
class TableDataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: _.cloneDeep(props.sources),
      color: _.cloneDeep(props.element.settings.color),
      params: _.cloneDeep(props.element.settings.params),
      countRequest: 0,
      isMultiple: false,
      data: []
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.sources, this.props.sources)) {
      this.setState(state => ({
        ...state,
        sources: _.cloneDeep(this.props.sources)
      }));
      await this.getData();
    }
    if (!_.isEqual(prevProps.element, this.props.element)) {
      this.setState(state => ({
        ...state,
        legend: _.cloneDeep(this.props.element.settings.legend),
        color: _.cloneDeep(this.props.element.settings.color),
        sources: _.cloneDeep(this.props.element.settings.sources)
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
        params: _.cloneDeep(this.props.element.settings.params)
      }));
      await this.getData();
    }
    if (!_.isEqual(prevProps.element.settings, this.props.element.settings)) {
      this.setState(s => ({
        ...s,
        settings: _.cloneDeep(this.props.element.settings)
      }));
    }
    if (
      JSON.stringify(prevProps.element.settings.params) !==
      JSON.stringify(this.props.element.settings.params)
    ) {
      this.setState(state => ({
        ...state,
        params: _.cloneDeep(this.props.element.settings.params)
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

  async componentDidMount() {
    await this.getData();
  }

  async getData() {
    const {
      data,
      isMultiple,
      isDate,
      needCallAgain,
      isLarge
    } = await new DataAdapter(
      this.props.element.settings.type,
      this.props.element.settings.sources,
      _.cloneDeep(this.props.formsStore.form_data),
      this.state.params,
      this.state.countRequest
    ).parseData();
    if (needCallAgain) {
      setTimeout(() => {
        this.getData();
        let count = this.state.countRequest;
        count += 1;
        this.setState(s => ({ ...s, countRequest: count }));
      }, 5000);
    }

    this.setState(s => ({
      ...s,
      data: data,
      isMultiple: isMultiple,
      isDate: isDate,
      isLarge: isLarge
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
    if (!this.state.sources > 1) {
      if (
        typeof this.state.data === "undefined" &&
        this.state.data[0].data.length === 0
      ) {
        if (this.state.countRequest < 3) {
          return <div>Загрузка...</div>;
        }
        return <div>Нет данных</div>;
      }
    } else {
      let matches = this.state.data.map(obj => {
        if (_.keys(obj).length > 0) {
          return obj.data.length > 0;
        }
        return _.keys(obj).length > 0;
      });
      let check = _.includes(matches, false);
      if (check) {
        if (this.state.countRequest < 3) {
          return <div>Загрузка...</div>;
        }
        return <div>Нет данных</div>;
      }
    }

    let data = this.state.data;

    if (
      this.state.settings?.sort?.value !== null &&
      typeof this.state.settings?.sort?.value !== "undefined" &&
      typeof data !== "undefined"
    ) {
      const sort = this.state.settings?.sort.value;
      switch (sort) {
        case "value":
          data.forEach((item, index) => {
            if (item.data.length > 0) {
              data[index].data = _.sortBy(item.data, ["y"]);
            }
          });
          break;
        case "key":
          data.forEach((item, index) => {
            if (item.data.length > 0) {
              data[index].data = _.sortBy(item.data, ["x"]);
            }
          });
          break;

        default:
          // data = data;
          break;
      }
    }

    const summary = data
      .map(item => item.data.reduce((acc, object) => acc + object.y, 0))
      .reduce((acc, item) => acc + item, 0);
    return (
      <ErrorBoundary>
        <div className="widget-table">
          <table className="vertical-table">
            <tbody>
              {data.map((item, key) => {
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
