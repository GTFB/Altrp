import React, {useCallback, useState, useEffect} from "react";
import {useTable, useSortBy} from "react-table";
import {useQuery, usePaginatedQuery, queryCache} from  "react-query";
import '../../../sass/altrp-pagination.scss';
import {Link} from "react-router-dom";
import {isEditor} from "../../../../../front-app/src/js/helpers";

/**
 *
 * @param settings
 * @param {Query} query
 * @return {*}
 * @constructor
 */
const AltrpTable = ({settings, query}) => {
  if (! (settings.tables_columns && settings.tables_columns.length)) {
    return <div children="Please Add Column"/>
  }
  if(! query.modelName){
    return <div children="Please Choose Model"/>
  }
  let _data =[], _status, _error, _latestData;
  const [page, setPage] = useState(1);

  const fetchModels = useCallback(async (key, page = 1) => {
    return query.getQueried({
      page,
    })
  });
  if(query.pageSize){
    /**
     * Если есть пагинация
     */
    const {
      status,
      resolvedData,
      latestData,
      error,
    } = usePaginatedQuery([query.modelName, page], fetchModels, {});
    _data = resolvedData ? resolvedData[query.modelName] : _data;
    _status = status;
    _error = error;
    _latestData = latestData;
    useEffect(() => {
      if (latestData?.hasMore) {
        queryCache.prefetchQuery([query.modelName, page + 1], fetchModels);
      }
    }, [latestData, fetchModels, page]);
  }else {
    /**
     * Если нет пагинации
     */
    const {status, data, error,} = useQuery(query.modelName, () => {
      return query.getResource().getQueried()
    }, [query.modelName]);
    _data = data;
    _status = status;
    _error = error;
  }
  let columns = [];
  columns = settingsToColumns(settings);
  let {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: React.useMemo(
        () => (
            columns || []
        ),
        [settings.tables_columns]
    ),
    data: React.useMemo(() => (_data || []), [_data]),
  }, );
  return <><table className="altrp-table" {...getTableProps()}>
    <thead className="altrp-table-head">
    {renderAdditionalRows(settings)}
    {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()} className="altrp-table-tr">
          {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="altrp-table-th">{column.render('column_name')}
                <span className="altrp-table-th_sort">
                    {column.isSorted
                        ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                        : ''}
                  </span>
              </th>
          ))}
        </tr>
    ))}
    </thead>
    <tbody {...getTableBodyProps()} className="altrp-table-tbody">
    {_status === "error" ? <tr>
              <td>{_error.message}</td>
            </tr> : _status === "loading" ? <tr>
              <td>Loading</td>
            </tr>
            : rows.map((row, i) => {
              prepareRow(row);
              return (
                  <tr {...row.getRowProps()} className="altrp-table-tr">
                    {row.cells.map((cell, _i) => {
                      let cellContent = cell.render('Cell');
                      let linkTag = isEditor() ? 'a': Link;
                      /**
                       * Если в настройках колонки есть url, и в данных есть id, то делаем ссылку
                       */
                      if(columns[_i].column_link && row.original.id){
                        cellContent = React.createElement(linkTag, {
                          to: columns[_i].column_link.replace(':id', row.original.id),
                          className: 'altrp-inherit',
                        }, cellContent)
                      }
                      return <td {...cell.getCellProps()} className="altrp-table-td">{cellContent}</td>
                    })}
                  </tr>
              )
            })}
    </tbody>
  </table>
    {((query.paginationType === 'prev-next') && query.pageSize) ?
      <div className="altrp-pagination">
        <button className={"altrp-pagination__previous"}
                onClick={() => setPage(old => Math.max(old - 1, 0))}
                disabled={page === 1}>
          {settings.prev_text || 'Previous Page'}
        </button>
        <div className="altrp-pagination__count">
          {settings.current_page_text || 'Current Page:'}
           {page}
        </div>
        <button className="altrp-pagination__next"
                onClick={() =>
                    setPage(old => (!_latestData || !_latestData.hasMore ? old : old + 1))
                }
                disabled={!_latestData || !_latestData.hasMore}>
          {settings.next_text || 'Next Page'}

        </button>
      </div> : ''
    }
  </>
};

export default AltrpTable

/**
 * Парсинг колонок из настроек в колонки для react-table
 * @param settings
 * @return {Array}
 */
function settingsToColumns(settings) {
  let columns = [];
  let { tables_columns } = settings;
  tables_columns = tables_columns || [];
  /**
   * Если в колонке пустые поля, то мы их игнорируем, чтобы не было ошибки
   */
  tables_columns.forEach(_column => {
    if (_column.column_name && _column.accessor) {
      columns.push(_column);
    }
  });
  // console.log(columns);

  return columns;
}

/**
 *
 * @param {{}}settings
 * @return {string|[]}
 */
function renderAdditionalRows(settings) {
  let { additional_rows } = settings;
  if(! _.isArray(additional_rows)){
    return '';
  }
  return additional_rows.map(row=>{
    row.additional_cells = row.additional_cells || [];
    return<tr key={`additional-row-${row.id}`}>
      {row.additional_cells.map(cell=>{
        cell.rowspan = cell.rowspan || 1;
        cell.colspan = cell.colspan || 1;
        return<th key={`additional-cell-${row.id}-${cell.id}`}
                  role="columnheader"
                  className="altrp-table-th"
                  colSpan={cell.colspan}
                  rowSpan={cell.rowspan}>{cell.title}</th>
      })}
    </tr>
  })

}