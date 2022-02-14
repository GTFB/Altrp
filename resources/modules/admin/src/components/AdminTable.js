import React, { Component } from "react";
import SortableHeader from "./AdminTableComponents/SortableHeader";
import AdminTableRow from "./AdminTableRow";
import Pagination from "./Pagination";
import Search from "./../svgs/search.svg"
import {InputGroup} from "@blueprintjs/core";
import {filterCategories} from "../js/helpers";
class AdminTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: false
    }
  }
  /**
   * Фильтр по введенной строке
   * @param {{}} e
   */

  filterByKeyboard = e => {
    if (_.isFunction(this.props.filterByKeyboard)) {
      this.props.filterByKeyboard(e.target.value);
    }
  };

  toggleFilterCategories = () => {
    this.setState(state => ({
      ...state,
      filter: !state.filter
    }))
  }

  render() {
    const {
      searchTables,
      sortingHandler,
      radiusTable, sortingField, filterPropsCategories, tableHalf } = this.props;
    const { filter } = this.state


    return (
      /*Search всех компонент*/
      <div className={"admin-table" + (radiusTable ? " admin-table-noRadius" : "")}>

        {searchTables && (
          <div className={filterPropsCategories ? "admin-table-top admin-table-top__flex" : "admin-table-top"}>
            <form className={filterPropsCategories ? "admin-table-top__form" : "admin-table-top__form-off"} onSubmit={searchTables.submit}>
              <InputGroup className="form-tables" value={searchTables.value} onChange={searchTables.change} />
              <Search />
              <button className="btn btn_bare admin-users-button btn__tables">Search</button>
            </form>
            {filterPropsCategories && (
              <span onClick={this.toggleFilterCategories} className="showFilter">{filter ? "Close filter categories" : "Open filter categories"}</span>
            )}
          </div>
        )}

        {filter && (
          <div className="admin-table__filterCategories">
            <span className="heading__categories">Categories:</span>
            <span onClick={() => filterPropsCategories.getCategories(null, "All")} className="admin-filters__current">
              <a className={filterPropsCategories.activeCategory === "All" ? "admin-filters__link active-category" : "admin-filters__link"}>
                All
              </a>
            </span>
            {filterPropsCategories.categoryOptions.map(item => {
              const itemsCount = filterCategories(filterPropsCategories.DidMountArray, item.value).length

              return (
                <span className="category__block-span" key={item.value}>
                   <span className="admin-filters__separator">|</span>
                   <a
                     className={item.value === filterPropsCategories.activeCategory ? "admin-filters__link active-category" : "admin-filters__link" }
                     onClick={() => filterPropsCategories.getCategories(item.value)}
                   >
                     {item.label} ({itemsCount})
                   </a>
                </span>)
            })}
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
