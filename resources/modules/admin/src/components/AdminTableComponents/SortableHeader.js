import React, { Component } from "react";
import VectorSvg from '../../svgs/vector.svg';

class SortableHeader extends Component {
  state = {
    order: 'ASC'
  }

  clickHandler = () => {
    this.setState(
      { order: this.state.order === 'ASC' ? 'DESC' : 'ASC' },
      () => this.props.sortingHandler(this.props.column.name, this.state.order)
    )
  }

  render() {
    const { column, sortingField } = this.props;
    const { order } = this.state;


    return <td className="admin-table__td " title={column.name}>
      {column.title}
      <VectorSvg onClick={this.clickHandler} className={`vector-svg ${order === 'DESC' ? 'role-svg' : ''} ${sortingField === column.name ? 'vector-svg--active' : ''}`} />
    </td>
  }
}

export default SortableHeader;
