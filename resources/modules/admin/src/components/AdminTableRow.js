import React, { Component } from "react";
import { Link } from "react-router-dom";
import Resource from "../../../editor/src/js/classes/Resource";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import NewTab from "./../svgs/newTab.svg";

export default class AdminTableRow extends Component {

  render() {
    const { row, arrayChecked } = this.props;
    return (
      <tr className={this.props.offBorderLast ? "admin-table-row admin-table-row-offLastBorder" : "admin-table-row"} key={row.id} title={row.id}>
        {arrayChecked ? (
          <td
            className="admin-table__td admin-table__td_check"
            key={"choose" + row.id}
            title={"choose" + row.id}
          >
            <input onChange={(e) => row.checkedTable(e, row.id)} type="checkbox" checked={arrayChecked.includes(row.id)}/>
          </td>
        ) : (
          <td
            className="admin-table__td admin-table__td_check"
            key={"choose" + row.id}
            title={"choose" + row.id}
          >
            <input type="checkbox" />
          </td>
        )}
        {this.props.columns.map((column, index) => {
          let tag = "span";
          let text = _.get(row, column.name, '')
          if(column.default && ! text){
            text = column.default
          }
          let props = {
            className: "td__content",
            // children: [row[column.name]],
            children: text
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
          if (column.button__table && row.button__table) {
            tag = "button";
            props.className = "td__content button__table";
            props.onClick = row.button__table
          }
          if (column.name === 'image') {
            tag = 'img'
            props.className = 'td__content td__content-image'
            props.src = row.url
            props.onClick = row.clickToImage
            delete props.children
          }
          if (column.copy) {
            tag = CopyToClipboard
            props.children = <button>Copy</button>
            props.text = text
            props.className = "copy-button__table"
          }
          if (column.switchToNewTab) {
            tag = "button";
            props.children = <NewTab width={16} height={16}/>
            props.className = "tab-button__table"
            props.onClick = () => {
              let path = _.get(row, column.get, '')
              let origin = window.location.origin
              window.open(origin + path, '_blank')
            }
          }
          if (column.is_boolean) {
            props.children = [
              _.get(row, column.name, false).toString()
            ];
          }

          return (
            <td
              className={`admin-table__td td ${column.name === 'image' ? 'admin-table__td-image' : ''}`}
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
                                            case "put":
                                              response = await resource[
                                                quickAction.method
                                                ](row.id, quickAction.data);
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
    );
  }
}
