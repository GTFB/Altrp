import React, {Component} from "react";

class AdminTable extends Component {
  render(){
    return<div className="admin-table">
      <table>
        <thead className="admin-table-head">
        <tr className="admin-table-row">
          <td className="admin-table__td admin-table__td_check"><input type="checkbox"/></td>
        {this.props.columns.map(column=>
            <td className="admin-table__td " key={column.name}>{column.title}</td>)}
        </tr>
        </thead>
        <tbody className="admin-table-body">
        {
          this.props.rows.map((row, idx)=>
          <tr className="admin-table-row" key={row.id}>
            <td className="admin-table__td admin-table__td_check" key={'choose' + row.id}><input type="checkbox"/></td>
            {
              this.props.columns.map(column=>
              <td className="admin-table__td" key={column.name + row.id}>
                {row[column.name]}
              </td>)
            }
          </tr>)
        }
        </tbody>
      </table>
    </div>;
  }
}

export default AdminTable