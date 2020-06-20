import React, {useCallback, useState, useEffect} from "react";
import {useTable} from "react-table";
import {useQuery, usePaginatedQuery, queryCache} from  "react-query";
import '../../../sass/altrp-pagination.scss';

/**
 *
 * @param settings
 * @param {Query} query
 * @return {*}
 * @constructor
 */
const AltrpTable = ({settings, query}) => {
  if (!settings.tables_columns) {
    return <div children="Please add Column"/>
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
  /**
   * Если в колонке пустые поля, то мы их игнорируем, чтобы не было ошибки
   */
  settings.tables_columns.forEach(_column => {
    if (_column.column_name && _column.accessor) {
      columns.push(_column);
    }
  });
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
  });
  return <><table className="altrp-table" {...getTableProps()}>
    <thead className="altrp-table-head">
    {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()} className="altrp-table-tr">
          {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="altrp-table-th">{column.render('column_name')}</th>
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
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()} className="altrp-table-td">{cell.render('Cell')}</td>
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
/*
import axios from "axios";
import { usePaginatedQuery, queryCache } from "react-query";

function Todos() {
  const [page, setPage] = React.useState(0);

  const fetchProjects = React.useCallback(async (key, page = 0) => {
    const { data } = await axios.get("/api/projects?page=" + page);
    return data;
  }, []);

  const {
    status,
    resolvedData,
    latestData,
    error,
    isFetching
  } = usePaginatedQuery(["projects", page], fetchProjects, {});

  // Prefetch the next page!
  React.useEffect(() => {
    if (latestData?.hasMore) {
      queryCache.prefetchQuery(["projects", page + 1], fetchProjects);
    }
  }, [latestData, fetchProjects, page]);

  return (
      <div>
        <p>
          In this example, each page of data remains visible as the next page is
          fetched. The buttons and capability to proceed to the next page are also
          supressed until the next page cursor is known. Each page is cached as a
          normal query too, so when going to previous pages, you'll see them
          instantaneously while they are also refetched invisibly in the
          background.
        </p>
        {status === "loading" ? (
            <div>Loading...</div>
        ) : status === "error" ? (
            <div>Error: {error.message}</div>
        ) : (
            // `resolvedData` will either resolve to the latest page's data
            // or if fetching a new page, the last successful page's data
            <div>
              {resolvedData.projects.map(project => (
                  <p key={project.id}>{project.name}</p>
              ))}
            </div>
        )}
        <span>Current Page: {page + 1}</span>
        <button
            onClick={() => setPage(old => Math.max(old - 1, 0))}
            disabled={page === 0}
        >
          Previous Page
        </button>{" "}
        <button
            onClick={() =>
                // Here, we use `latestData` so the Next Page
                // button isn't relying on potentially old data
                setPage(old => (!latestData || !latestData.hasMore ? old : old + 1))
            }
            disabled={!latestData || !latestData.hasMore}
        >
          Next Page
        </button>
        {// Since the last page's data potentially sticks around between page requests,
          // we can use `isFetching` to show a background loading
          // indicator since our `status === 'loading'` state won't be triggered
          isFetching ? <span> Loading...</span> : null}{" "}
      </div>
  );
}

export default Todos;
*/