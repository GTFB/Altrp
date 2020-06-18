import {useTable} from "react-table";
import {useQuery} from "react-query";
import namor from 'namor'
import {useState, useCallback, useEffect} from "react";

/**
 *
 * @param settings
 * @param {Query} query
 * @return {*}
 * @constructor
 */
const AltrpTable = ({settings, query}) => {

  const { status, data, error, isFetching } = useQuery(query.modelName, ()=>{return query.getResource().getQueried()});
  let columns = [];
  /**
   * Если в колонке пустые поля, то мы их игнорируем, чтобы не было ошибки
   */
  settings.tables_columns.forEach(_column=>{
    if(_column.column_name && _column.accessor){
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
    {(error) ? <tr><td>error</td></tr>
        : isFetching ? <tr><td>Loading</td></tr>
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

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({words: 1, numbers: 0}),
    lastName: namor.generate({words: 1, numbers: 0}),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
        statusChance > 0.66
            ? 'relationship'
            : statusChance > 0.33
            ? 'complicated'
            : 'single',
  }
};

function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  };

  return makeDataLevel()
}
