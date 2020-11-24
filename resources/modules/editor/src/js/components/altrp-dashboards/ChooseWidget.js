import React, { Component, Suspense } from "react";

import {
  BAR,
  PIE,
  DONUT,
  AREA,
  LINE,
  TABLE,
  POINT
} from "../../../../../admin/src/components/dashboard/widgetTypes";

import BarDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/BarDataSource";
import PieDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/PieDataSource";
import DonutDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/DonutDataSource";
import AreaDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/AreaDataSource";
import TableDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/TableDataSource";
import LineDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/LineDataSource";
import ScatterDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/ScatterDataSource";

class ChooseWidget extends Component {
  constructor(props) {
    super(props);
    let element = _.cloneDeep(props.editElement, []);
    this.state = {
      sources: _.cloneDeep(props.sources),
      type: _.cloneDeep(props.type),
      editElement: _.cloneDeep(element),
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
      let element = _.cloneDeep(this.props.editElement, []);
      this.setState(state => ({ ...state, editElement: element }));
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
    switch (this.state.type) {
      case BAR:
        widget = this.renderBar();
        break;
      case PIE:
        widget = this.renderPie();
        break;
      case DONUT:
        widget = this.renderDonut();
        break;
      case AREA:
        widget = this.renderArea();
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
    return (
      <div
        className={`chart-container ${this.props.editElement.settings.legend
          .position || ""}`}
      >
        {widget}
      </div>
    );
  }

  renderBar() {
    return (
      <BarDataSource
        element={this.props.editElement}
        sources={this.state.sources}
      />
    );
  }

  renderPie() {
    return (
      <PieDataSource
        element={this.props.editElement}
        sources={this.state.sources}
      />
    );
  }

  renderDonut() {
    return (
      <DonutDataSource
        element={this.props.editElement}
        sources={this.state.sources}
      />
    );
  }

  renderArea() {
    return (
      <AreaDataSource
        element={this.props.editElement}
        sources={this.state.sources}
      />
    );
  }

  renderLine() {
    return (
      <LineDataSource
        element={this.props.editElement}
        sources={this.state.sources}
      />
    );
  }

  renderTable() {
    return (
      <TableDataSource
        element={this.props.editElement}
        sources={this.state.sources}
      />
    );
  }

  renderScatter() {
    return (
      <ScatterDataSource
        element={this.props.editElement}
        sources={this.state.sources}
      />
    );
  }

  render() {
    return this.getWidget();
  }
}

export default ChooseWidget;
