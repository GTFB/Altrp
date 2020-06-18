import {useTable} from "react-table";


export default function AltrpTable(data) {
  console.log(data);
  let columns = [];
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: [],
    data: {},
  });
  return  <table className="altrp-table" {...getTableProps()}>
    <thead>
    {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
          ))}
        </tr>
    ))}
    </thead>
  </table>
}