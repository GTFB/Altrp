import React, { Component } from "react";

import {
  BAR,
  PIE,
  LINE,
  TABLE,
  POINT
} from "../../../../../admin/src/components/dashboard/widgetTypes";

import BarDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/BarDataSource";
import PieDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/PieDataSource";
import TableDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/TableDataSource";
import LineDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/LineDataSource";
import ScatterDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/ScatterDataSource";

class ChooseWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: _.cloneDeep(props.sources),
      type: _.cloneDeep(props.type),
      editElement: _.cloneDeep(props.editElement),
      params: _.cloneDeep(props.params),
      legend: _.cloneDeep(props.editElement?.settings.legend)
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.editElement, this.props.editElement)) {
      let element = _.cloneDeep(this.props.editElement, []);
      this.setState(state => ({ ...state, editElement: element }));
    }
    if (
      JSON.stringify(prevProps.params) !== JSON.stringify(this.props.params)
    ) {
      this.setState(state => ({
        ...state,
        editElement: _.cloneDeep(this.props.editElement)
      }));
    }
    if (!_.isEqual(prevProps.type, this.props.type)) {
      this.setState(state => ({ ...state, type: this.props.type }));
    }
    if (!_.isEqual(prevProps.sources, this.props.sources)) {
      this.setState(state => ({ ...state, sources: this.props.sources }));
    }
  }
  getWidget() {
    let widget = "Выберите тип диаграммы";
    switch (this.props.editElement?.settings?.type) {
      case BAR:
        widget = this.renderBar();
        break;
      case PIE:
        widget = this.renderPie();
        break;
      case LINE:
        widget = this.renderLine();
        break;
      case TABLE:
        widget = this.renderTable();
        break;
      case POINT:
        widget = this.renderScatter();
        break;
      default:
        widget = <div>Выберите тип диаграммы</div>;
        break;
    }
    return <div className="chart-container">{widget}</div>;
  }

  renderBar() {
    return (
      <BarDataSource
        element={_.cloneDeep(this.props.editElement)}
        sources={_.cloneDeep(this.state.sources)}
      />
    );
  }

  renderPie() {
    return (
      <PieDataSource
        element={_.cloneDeep(this.props.editElement)}
        sources={_.cloneDeep(this.state.sources)}
      />
    );
  }

  renderLine() {
    return (
      <LineDataSource
        element={_.cloneDeep(this.props.editElement)}
        sources={_.cloneDeep(this.state.sources)}
      />
    );
  }

  renderTable() {
    return (
      <TableDataSource
        element={_.cloneDeep(this.props.editElement)}
        sources={_.cloneDeep(this.state.sources)}
      />
    );
  }

  renderScatter() {
    return (
      <ScatterDataSource
        element={_.cloneDeep(this.props.editElement)}
        sources={_.cloneDeep(this.state.sources)}
      />
    );
  }

  render() {
    return this.getWidget();
  }
}

export default ChooseWidget;
