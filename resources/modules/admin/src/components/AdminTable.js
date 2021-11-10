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
      search,
      searchSQLEditors,
      searchTemplates,
      searchModel,
      searchDataSources,
      sortingHandler,
      searchAccessRoles,
      searchAccessPermissions,
      searchModalPage,
      searchRobots,
      searchAreas,
      searchMenus, radiusTable, sortingField, tableHalf } = this.props;
    return (
      /*Search всех компонент*/
      <div className={"admin-table" + (radiusTable ? " admin-table-noRadius" : "")}>
        {search && (
          <form onSubmit={search.submitHandler} className="admin-table-top">
            <InputGroup
              value={search.value}
              onChange={search.changeHandler}
              type="text"
              className="form-tables"
            />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchSQLEditors && (
          <form className="admin-table-top" onSubmit={searchSQLEditors.onSubmitSearchSQL}>
            <InputGroup className="form-tables" value={searchSQLEditors.valueSQL} onChange={searchSQLEditors.onChangeSQL} />
            <Search />
            <button type="button" onClick={searchSQLEditors.onClickSQL} className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchTemplates && (
          <form className="admin-table-top" onSubmit={searchTemplates.onSubmitSearchTemplates}>
            <InputGroup className="form-tables" value={searchTemplates.valueTemplates} onChange={searchTemplates.onChangeTemplates} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchModel && (
          <form className="admin-table-top" onSubmit={searchModel.onSubmitModel}>
            <InputGroup className="form-tables" value={searchModel.valueModel} onChange={searchModel.onChangeModel} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchDataSources && (
          <form className="admin-table-top" onSubmit={searchDataSources.onSubmitDataSources}>
            <InputGroup className="form-tables" value={searchDataSources.valueDataSources} onChange={searchDataSources.onChangeDataSources} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchAccessRoles && (
          <form className="admin-table-top" onSubmit={searchAccessRoles.onSubmitAccessRoles}>
            <InputGroup className="form-tables" value={searchAccessRoles.valueAccessRoles} onChange={searchAccessRoles.onChangeAccessRoles} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchAccessPermissions && (
          <form className="admin-table-top" onSubmit={searchAccessPermissions.onSubmitAccessPermissions}>
            <InputGroup className="form-tables" value={searchAccessPermissions.valueAccessPermissions} onChange={searchAccessPermissions.onChangeAccessPermissions} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchModalPage && (
          <form className="admin-table-top" onSubmit={searchModalPage.onSubmitModelPage}>
            <InputGroup className="form-tables" value={searchModalPage.valueModelPage} onChange={searchModalPage.onChangeModalPage} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchRobots && (
          <form className="admin-table-top" onSubmit={searchRobots.onSubmitRobots}>
            <InputGroup className="form-tables" value={searchRobots.valueRobots} onChange={searchRobots.onChangeRobots} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchAreas && (
          <form className="admin-table-top" onSubmit={searchAreas.onSubmitAreas}>
            <InputGroup className="form-tables" value={searchAreas.valueAreas} onChange={searchAreas.onChangeAreas} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchMenus && (
          <form className="admin-table-top" onSubmit={searchMenus.onSubmitMenus}>
            <InputGroup className="form-tables" value={searchMenus.valueMenus} onChange={searchMenus.onChangeMenus} />
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
