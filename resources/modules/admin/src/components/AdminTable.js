import React, { Component } from "react";
import SortableHeader from "./AdminTableComponents/SortableHeader";
import AdminTableRow from "./AdminTableRow";
import Pagination from "./Pagination";
import Search from "./../svgs/search.svg"
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
      searchMenus, radiusTable, sortingField } = this.props;
    return (
      /*Search всех компонент*/
      <div className={"admin-table" + (radiusTable ? " admin-table-noRadius" : "")}>
        {search && (
          <form onSubmit={search.submitHandler} className="admin-table-top">
            <input
              value={search.value}
              onChange={search.changeHandler}
              type="text"
              className="form-tables form-tables__indentRight"
            />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchSQLEditors && (
          <form className="admin-table-top" onSubmit={searchSQLEditors.onSubmitSearchSQL}>
            <input className="form-tables form-tables__indentRight " value={searchSQLEditors.valueSQL} onChange={searchSQLEditors.onChangeSQL} />
            <Search />
            <button type="button" onClick={searchSQLEditors.onClickSQL} className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchTemplates && (
          <form className="admin-table-top" onSubmit={searchTemplates.onSubmitSearchTemplates}>
            <input className="form-tables form-tables__indentRight" value={searchTemplates.valueTemplates} onChange={searchTemplates.onChangeTemplates} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchModel && (
          <form className="admin-table-top" onSubmit={searchModel.onSubmitModel}>
            <input className="form-tables form-tables__indentRight" value={searchModel.valueModel} onChange={searchModel.onChangeModel} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchDataSources && (
          <form className="admin-table-top" onSubmit={searchDataSources.onSubmitDataSources}>
            <input className="form-tables form-tables__indentRight" value={searchDataSources.valueDataSources} onChange={searchDataSources.onChangeDataSources} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchAccessRoles && (
          <form className="admin-table-top" onSubmit={searchAccessRoles.onSubmitAccessRoles}>
            <input className="form-tables form-tables__indentRight" value={searchAccessRoles.valueAccessRoles} onChange={searchAccessRoles.onChangeAccessRoles} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchAccessPermissions && (
          <form className="admin-table-top" onSubmit={searchAccessPermissions.onSubmitAccessPermissions}>
            <input className="form-tables form-tables__indentRight" value={searchAccessPermissions.valueAccessPermissions} onChange={searchAccessPermissions.onChangeAccessPermissions} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchModalPage && (
          <form className="admin-table-top" onSubmit={searchModalPage.onSubmitModelPage}>
            <input className="form-tables form-tables__indentRight" value={searchModalPage.valueModelPage} onChange={searchModalPage.onChangeModalPage} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchRobots && (
          <form className="admin-table-top" onSubmit={searchRobots.onSubmitRobots}>
            <input className="form-tables form-tables__indentRight" value={searchRobots.valueRobots} onChange={searchRobots.onChangeRobots} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchAreas && (
          <form className="admin-table-top" onSubmit={searchAreas.onSubmitAreas}>
            <input className="form-tables form-tables__indentRight" value={searchAreas.valueAreas} onChange={searchAreas.onChangeAreas} />
            <Search />
            <button className="btn btn_bare admin-users-button btn__tables">Search</button>
          </form>
        )}

        {searchMenus && (
          <form className="admin-table-top" onSubmit={searchMenus.onSubmitMenus}>
            <input className="form-tables form-tables__indentRight" value={searchMenus.valueMenus} onChange={searchMenus.onChangeMenus} />
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
              <AdminTableRow key={row.id} row={row} {...this.props} />
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
