import React, { Component } from "react";
import SortableHeader from "./AdminTableComponents/SortableHeader";
import AdminTableRow from "./AdminTableRow";
class AdminTable extends Component {
  /**
   * Фильтр по введенной строке
   * @param {{}} e
   */

  filterByKeyboard = e => {
    if (_.isFunction(this.props.filterByKeyboard)) {
      this.props.filterByKeyboard(e.target.value);
    }
  };

  render() {
    const { search, sortingHandler, sortingField } = this.props;
    return (
      <div className="admin-table">
        {search && (
          <div className="admin-table">
            <input
              value={search.value}
              onChange={search.changeHandler}
              type="text"
              className="form-group"
            />
          </div>
        )}
        <table>
          <thead className="admin-table-head">
            <tr className="admin-table-row">
              <td className="admin-table__td admin-table__td_check">
                <input type="checkbox" />
              </td>
              {this.props.columns.map(column =>
                sortingHandler ? (
                  <SortableHeader
                    key={column.name}
                    column={column}
                    sortingHandler={sortingHandler}
                    sortingField={sortingField}
                  />
                ) : (
                  <td
                    className="admin-table__td "
                    key={column.name}
                    title={column.name}
                  >
                    {column.title}
                  </td>
                )
              )}
            </tr>
          </thead>
          <tbody className="admin-table-body">
            {this.props.rows.map(row => (
              <AdminTableRow key={row.id} row={row} {...this.props} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminTable;
