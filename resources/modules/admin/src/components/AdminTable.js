import React, { Component } from "react";
import { Link } from "react-router-dom";
import Resource from "../../../editor/src/js/classes/Resource";
import SortableHeader from "./AdminTableComponents/SortableHeader";
class AdminTable extends Component {
  /**
   * Фильтр по ыыеденной строк
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
              <tr className="admin-table-row" key={row.id} title={row.id}>
                <td
                  className="admin-table__td admin-table__td_check"
                  key={"choose" + row.id}
                  title={"choose" + row.id}
                >
                  <input type="checkbox" />
                </td>
                {this.props.columns.map((column, index) => {
                  let tag = "span";
                  let props = {
                    className: "td__content",
                    // children: [row[column.name]],
                    children: _.get(row, column.name, "")
                  };
                  if (column.url && row.url) {
                    tag = "a";
                    props.href = row.url;
                    if (column.target) {
                      props.target = column.target;
                    }
                  }
                  if (column.editUrl && row.editUrl) {
                    tag = column.tag === "Link" ? Link : "a";
                    props.href = row.editUrl;
                    if (column.tag === "Link") {
                      props.to = {
                        pathname: row.editUrl,
                        data: row
                      };
                    }
                    if (column.target) {
                      props.target = column.target;
                    }
                  }
                  if (column.is_button) {
                    tag = "button";
                    props.title = column.button.title;
                    props.children = column.button.title;
                    props.onClick = () => {
                      column.button.function(row);
                    };
                  }
                  if (column.is_boolean) {
                    props.children = [
                      _.get(row, column.name, false).toString()
                    ];
                  }

                  return (
                    <td
                      className="admin-table__td td"
                      key={column.name + row.id}
                      title={column.name + row.id}
                    >
                      {React.createElement(tag, props)}
                      {index === 0 && (
                        <span className="quick-action-menu">
                          {this.props.quickActions &&
                            this.props.quickActions.map(
                              (quickAction, index) => {
                                let item = "";
                                switch (quickAction.tag) {
                                  case "a":
                                    {
                                      let href = quickAction.props.href.replace(
                                        ":id",
                                        row.id
                                      );

                                      item = (
                                        <a
                                          className={
                                            "quick-action-menu__item " +
                                            (quickAction.className || "")
                                          }
                                          {...(quickAction.props || {})}
                                          href={href}
                                        >
                                          {quickAction.title}
                                        </a>
                                      );
                                    }
                                    break;
                                  case "Link":
                                    {
                                      let href = quickAction.props.href.replace(
                                        ":id",
                                        row.id
                                      );

                                      item = (
                                        <Link
                                          className={
                                            "quick-action-menu__item " +
                                            (quickAction.className || "")
                                          }
                                          {...(quickAction.props || {})}
                                          to={href}
                                        >
                                          {quickAction.title}
                                        </Link>
                                      );
                                    }
                                    break;
                                  case "button":
                                    let route = quickAction.route.replace(
                                      ":id",
                                      row.id
                                    );
                                    item = (
                                      <button
                                        className={
                                          "quick-action-menu__item " +
                                          (quickAction.className || "")
                                        }
                                        {...(quickAction.props || {})}
                                        onClick={async () => {
                                          if (quickAction.confirm) {
                                            if (
                                              !(await confirm(
                                                quickAction.confirm
                                              ))
                                            ) {
                                              return;
                                            }
                                          }
                                          const resource = new Resource({
                                            route
                                          });
                                          if (
                                            _.isFunction(
                                              resource[quickAction.method]
                                            )
                                          ) {
                                            let response;
                                            switch (quickAction.method) {
                                              case "get":
                                                response = await resource[
                                                  quickAction.method
                                                ](row.id);
                                                break;

                                              default:
                                                response = await resource[
                                                  quickAction.method
                                                ]();
                                                break;
                                            }
                                            _.isFunction(quickAction.after)
                                              ? quickAction.after(response)
                                              : "";
                                          }
                                        }}
                                      >
                                        {quickAction.title}
                                      </button>
                                    );
                                    break;
                                  // case 'button': {
                                  //   let route = quickAction.route.replace(':id', row.id);
                                  //   item = <button
                                  //       className={'quick-action-menu__item ' + (quickAction.className || '')}
                                  //       {...quickAction.props || {}}
                                  //       onClick={async () => {
                                  //         if (quickAction.confirm) {
                                  //           if (!await confirm(quickAction.confirm)) {
                                  //             return;
                                  //           }
                                  //         }
                                  //         let resource = new Resource({route: route});
                                  //         if (_.isFunction(resource[quickAction.method])) {
                                  //           await resource[quickAction.method]();
                                  //           _.isFunction(quickAction.after) ? quickAction.after() : ''
                                  //         }
                                  //       }}
                                  //   >{quickAction.title}</button>;
                                  // }
                                  // break;

                                  default:
                                    break;
                                }
                                if (quickAction.callBack) {
                                  item = (
                                    <button
                                      className={
                                        "quick-action-menu__item " +
                                        (quickAction.className || "")
                                      }
                                      onClick={() => quickAction.callBack(row)}
                                    >
                                      {quickAction.title}
                                    </button>
                                  );
                                }
                                return (
                                  <span
                                    className="quick-action-menu__item_wrapper"
                                    key={index + row.id}
                                  >
                                    {item}
                                  </span>
                                );
                              }
                            )}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminTable;
