import React, { Component } from "react";
import VectorSvg from '../../svgs/vector.svg';

class SortableHeader extends Component {
  state = {
    order: 'DESC'
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


    return <td className="admin-table__td "  title={column.name}>
      <span style={{ cursor: 'pointer' }} onClick={this.clickHandler}>{column.title}</span>
      <small style={{marginLeft: '6px', visibility: `${sortingField === column.name ? 'visible' : 'hidden'}`}}>{order}</small>
      {/*<VectorSvg onClick={this.clickHandler} className={`vector-svg ${order === 'DESC' ? 'role-svg' : ''} ${sortingField === column.name ? 'vector-svg--active' : ''}`} />*/}
    </td>
  }
}

export default SortableHeader;
