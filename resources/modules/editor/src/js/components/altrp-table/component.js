import {useTable} from "react-table";
import {useQuery} from "react-query";

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
  const {data, error, isFetching} = useQuery(query.modelName, () => {
    return query.getResource().getQueried()
  });
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
    data: React.useMemo(() => (data || []), [data]),
  });

  return <table className="altrp-table" {...getTableProps()}>
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
    {(error) ? <tr>
          <td>error</td>
        </tr>
        : isFetching ? <tr>
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
};

export default AltrpTable
