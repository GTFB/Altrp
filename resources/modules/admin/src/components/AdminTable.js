import React, { Component } from "react";
import SortableHeader from "./AdminTableComponents/SortableHeader";
import AdminTableRow from "./AdminTableRow";
import Pagination from "./Pagination";
import Search from "./../svgs/search.svg"
import {InputGroup} from "@blueprintjs/core";
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
    const {
      searchTables,
      sortingHandler,
      radiusTable, sortingField, tableHalf } = this.props;
    return (
      /*Search всех компонент*/
      <div className={"admin-table" + (radiusTable ? " admin-table-noRadius" : "")}>

        {searchTables && (
          <form className="admin-table-top" onSubmit={searchTables.submit}>
            <InputGroup className="form-tables" value={searchTables.value} onChange={searchTables.change} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
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
              <AdminTableRow offBorderLast={this.props.offBorderLast} key={row.id} row={row} {...this.props} />
            ))}
          </tbody>
        </table>

        {
          this.props.openPagination && (
            <Pagination
              pageCount={this.props.pageCount}
              currentPage={this.props.currentPage}
              changePage={this.props.changePage}
              itemsCount={this.props.itemsCount}
            />
          )
        }
      </div>
    );
  }
}

export default AdminTable;
