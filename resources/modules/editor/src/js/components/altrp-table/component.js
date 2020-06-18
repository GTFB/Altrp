import {useTable} from "react-table";
import namor from 'namor'


const AltrpTable = () => {
  // console.log(data);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: React.useMemo(
        () => [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
        []
    ),
    data: React.useMemo(() => makeData(20), []),
  });

  return <table className="altrp-table" {...getTableProps()}>
    <thead className="altrp-table-head">
    {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()} className="altrp-table-tr">
          {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="altrp-table-th">{column.render('Header')}</th>
          ))}
        </tr>
    ))}
    </thead>
    <tbody {...getTableBodyProps()} className="altrp-table-tbody">
    {rows.map((row, i) => {
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
