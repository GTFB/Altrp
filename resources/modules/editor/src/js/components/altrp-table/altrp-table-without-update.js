import '../../../sass/altrp-pagination.scss';
import {isEditor, parseURLTemplate} from "../../../../../front-app/src/js/helpers";
import {Link} from "react-router-dom";
import {renderAdditionalRows, settingsToColumns} from "./altrp-table";
import {useSortBy, useTable, usePagination} from "react-table";
import AltrpQueryComponent from "../altrp-query-component/altrp-query-component";
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";
import {iconsManager} from "../../../../../admin/src/js/helpers";

/**
 * Компонент, который работает только с внешними данными, которые не обновляются с сервера
 * @param {{}} settings
 * @param {string} widgetId
 * @param {Query} query
 * @param {{}} data
 * @param {AltrpModel} currentModel
 * @param {string} _status
 * @param {{}} _error
 * @param {function} setSortSettings
 * @param {function} setFilterSettings
 * @param {function} setPage
 * @param {{}} filterSetting
 * @param {{}} sortSetting
 * @param {[]} _latestData
 * @return {*}
 * @constructor
 */
function AltrpTableWithoutUpdate(
    {
      settings,
      widgetId,
      query,
      data,
      currentModel,
      _status,
      _error,
      setSortSettings,
      setFilterSettings,
      filterSetting,
      _latestData,
      sortSetting
    }) {
  React.useEffect(() => {
    if (!data) {
      data = [];
      return;
    }
    if (!_.isArray(data)) {
      data = [data];
    }
  }, [data]);
  const {inner_page_size, inner_sort} = settings;
  let columns = React.useMemo(() => settingsToColumns(settings), [settings]);
  // const plugins =
  //     React.useMemo(() => {
  //       const plugins = [];
  //       if (inner_sort) {
  //         plugins.push(useSortBy);
  //       }
  //       if (inner_page_size && (inner_page_size >= 1)) {
  //         plugins.push(usePagination);
  //       }
  //       return plugins;
  //     }, [inner_page_size, inner_sort]);
  const plugins = [useSortBy, usePagination, ];
  const tableSettings = React.useMemo(() => {
    const tableSettings = {
      columns,
      data,
    };
    if ((inner_page_size >= 1)) {
      tableSettings.initialState = {
        pageSize: Number(inner_page_size),
      };
    } else {
      tableSettings.initialState = {
        pageSize: data.length,
      };
    }
    tableSettings.disableSortBy = ! inner_sort;
    return tableSettings;
  }, [inner_page_size, inner_sort, data, columns]);
  console.log(tableSettings);
  const ReactTable = useTable(
      tableSettings,
      ...plugins
  );
  // console.log(ReactTable);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    getRowId,
    rows,
    setPageSize,
    state: {pageIndex, pageSize},
  } = ReactTable;
  console.log(ReactTable);
  React.useEffect(
      () => {
        if (!setPageSize) {
          return
        }
        if ((!Number(inner_page_size) || Number(inner_page_size < 1))) {
          setPageSize(data.length || 10);
        }
        setPageSize(Number(inner_page_size) || data.length || 10);
      },
      [inner_page_size, data],
  );
  /**
   * Настройки пагинации
   */
  const paginationProps =
      React.useMemo(() => {
        let paginationProps = null;
        if (inner_page_size && (inner_page_size >= 1)) {
          paginationProps = {
            settings,
            nextPage,
            previousPage,
            pageIndex,
            pageCount,
            pageSize,
            setPageSize,
            widgetId,
            gotoPage,
          };
        }
        return paginationProps;
      }, [inner_page_size, pageSize, pageCount, pageIndex ]);


  return <>
    <table className={"altrp-table altrp-table_columns-" + columns.length} {...getTableProps()}>
      <thead className="altrp-table-head">
      {renderAdditionalRows(settings)}
      {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className="altrp-table-tr">
            {headerGroup.headers.map((column, idx) => {
                  const {column_width, column_header_alignment} = column;
                  let columnProps = column.getHeaderProps();
                  if (inner_sort) {
                    columnProps = column.getHeaderProps(column.getSortByToggleProps());
                  }
                  if (column_width) {
                    columnProps.width = column_width + '%';
                  }
                  // columnProps.style = {};
                  // if (column_width)  columnProps.style.width = column_width;
                  // if (column_header_alignment)  columnProps.style.textAlign = column_header_alignment;
                  return <th {...columnProps}
                             className="altrp-table-th"
                             key={idx}>{
                    column.render('column_name')
                  }
                    {
                      (inner_sort) && (column.isSorted
                          ? column.isSortedDesc
                              ? iconsManager().renderIcon('chevron', {className: 'rotate-180 sort-icon '})
                              : iconsManager().renderIcon('chevron', {className: 'sort-icon'})
                          : '')
                    }
                  </th>;
                }
            )}
          </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {(page ? page : rows).map((row, i) => {
        prepareRow(row);
        return (
            <tr {...row.getRowProps()} className="altrp-table-tr">

              {row.cells.map(cell => {
                let cellContent = cell.render('Cell');
                if (cell.column.id === '##') {
                  cellContent = cell.row.index + 1;
                }
                return <td {...cell.getCellProps()} className="altrp-table-td">{cellContent}</td>
              })}
            </tr>
        )
      })}

      </tbody>
    </table>
    {paginationProps && <Pagination {...paginationProps}/>}
  </>
}

/**
 *
 * @param {{}}settings
 * @param {function} nextPage
 * @param {function} previousPage
 * @param {function} setPageSize
 * @param {function} gotoPage
 * @param {int} pageIndex
 * @param {int} pageCount
 * @param {int} pageSize
 * @param {string} widgetId
 * @return {*}
 */
export function Pagination(
    {
      settings,
      nextPage,
      previousPage,
      setPageSize,
      pageIndex,
      pageCount,
      pageSize,
      widgetId,
      gotoPage,
    }) {
  const {inner_page_count_options} = settings;
  let countOptions =
      React.useMemo(() => {
        let countOptions = null;
        if (inner_page_count_options) {
          countOptions = inner_page_count_options.split('\n');
          countOptions = countOptions.map(o => ({value: Number(o), label: Number(o)}));
        }
        return countOptions
      }, [inner_page_count_options]);
  console.log(pageSize);
  return <div className="altrp-pagination">
    <button className={"altrp-pagination__previous"}
            onClick={() => {
              previousPage();
            }}
            disabled={pageIndex === 0}>
      {settings.prev_text || 'Previous Page'}
    </button>
    <div className="altrp-pagination__count">
      {settings.current_page_text || 'Current Page:'}
      {pageIndex + 1}
    </div>
    <button className="altrp-pagination__next"
            onClick={() => {
              nextPage()
            }}
            disabled={pageCount === pageIndex + 1}>
      {settings.next_text || 'Next Page'}
    </button>
    {<input className="altrp-pagination__goto-page"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={(e) => {
                              const page = e.target.value ? Number(e.target.value) - 1 : 0;
                              gotoPage(page)
                            }}/>}
    {countOptions && <AltrpSelect className="altrp-pagination__select-size"
                                  options={countOptions}
                                  classNamePrefix={widgetId + ' altrp-field-select2'}
                                  value={countOptions.find(o => o.value === pageSize)}
                                  isSearchable={false}
                                  onChange={value => {
                                    setPageSize(value.value)
                                  }}/>}

  </div>
}

export default (props) => {
  return <AltrpQueryComponent {...props}><AltrpTableWithoutUpdate/></AltrpQueryComponent>
}